"use client";
import Image from "next/image";
import { ShoppingCart, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/serveractions/getproducts";
import { productInterface } from "@/interfaces/productInterface";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<productInterface[]>([]);
  const [cart, setCart] = useState<Record<string, { product: productInterface; count: number }>>({});
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProductData();
  }, []);

  useEffect(() => {
    const saveUserData = async () => {
      if (isSignedIn && user) {
        try {
          await axios.post("http://localhost:5000/user/signup", {
            email: user.emailAddresses[0]?.emailAddress,
            username: user.firstName || "Guest",
            profile: user.profileImageUrl || "",
            type: "customer",
          });
          console.log("User data saved successfully.");
        } catch (error) {
          console.error("Failed to save user data:", error);
        }
      }
    };
    saveUserData();
  }, [isSignedIn, user]);

  const addToCart = (product: productInterface) => {
    setCart((prevCart) => {
      const existingItem = prevCart[product._id];
      return {
        ...prevCart,
        [product._id]: {
          product,
          count: existingItem ? existingItem.count + 1 : 1,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Foodie Market</h1>
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <Search className="w-6 h-6" />
            </a>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
            <Link href="/cart">
              <a className="text-gray-600 hover:text-gray-800 relative">
                <ShoppingCart className="w-6 h-6" />
                {Object.keys(cart).length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                    {Object.values(cart).reduce((acc, item) => acc + item.count, 0)}
                  </span>
                )}
              </a>
            </Link>
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <span className="text-gray-800 font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Sign In
                </button>
              </SignInButton>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Taste the Luxury</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Indulge in premium food products crafted for flavor and experience. Elevate your meals to the next level.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">Loading products...</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
              >
                <div className="relative h-48 md:h-64">
                  <img
                    src={product.product_image || "/placeholder-image.png"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{product.name}</h3>
                  <p className="text-gray-700 font-medium text-base mb-4">
                    Price: <span className="text-red-600 font-bold">${product.price.toFixed(2)}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description || "Delicious and premium-quality product."}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Foodie Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
