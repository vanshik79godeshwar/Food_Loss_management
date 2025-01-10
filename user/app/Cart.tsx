"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Cart() {
  const router = useRouter();
  const { cart, increment, decrement, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const calculateTotal = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.product.price * item.count,
      0
    );
  };

  const handlePayment = async () => {
    try {
      // Format products data for backend
      const products = Object.values(cart).map(({ product, count }) => ({
        _id: product._id,
        quantity: count,
        prod_amount: product.price
      }));

      // Initialize payment
      const response = await fetch("/api/payment/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: "user123", // Replace with actual user ID from your auth system
          products,
          amount: calculateTotal()
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize payment");
      }

      const { bill } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: calculateTotal() * 100,
        currency: "INR",
        name: "Your Store Name",
        description: "Purchase Payment",
        order_id: bill.order_id,
        handler: async function (response: any) {
          try {
            const formData = new FormData();
            formData.append('razorpay_payment_id', response.razorpay_payment_id);
            formData.append('razorpay_order_id', response.razorpay_order_id);
            formData.append('razorpay_signature', response.razorpay_signature);

            const verificationResponse = await fetch("/api/payment/update", {
              method: "POST",
              body: formData,
            });

            const result = await verificationResponse.json();

            if (result.success) {
              toast.success("Payment successful!");
              clearCart();
              router.push("/order-success"); // Create this page to show success message
            } else {
              toast.error(result.message || "Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer Name", // Replace with actual customer name
          email: "customer@example.com", // Replace with actual email
          contact: "9999999999" // Replace with actual contact
        },
        theme: {
          color: "#6366f1"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Failed to initialize payment");
    }
  };

  if (Object.keys(cart).length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
          <div className="space-y-4">
            {Object.values(cart).map(({ product, count }) => (
              <div
                key={product._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.product_image || "/placeholder-image.png"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrement(product)}
                      className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-700 font-medium">{count}</span>
                    <button
                      onClick={() => increment(product)}
                      className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-end">
            <div className="text-xl font-bold text-gray-800 mb-4">
              Total: ₹{calculateTotal().toFixed(2)}
            </div>
            <div className="space-x-4">
              <Link
                href="/"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Continue Shopping
              </Link>
              <button 
                onClick={handlePayment}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}