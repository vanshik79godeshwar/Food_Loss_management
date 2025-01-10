// app/order-success/page.tsx
import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase!</p>
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}