"use client";
import Image from "next/image";
import { ShoppingCart, Search, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/serveractions/getproducts";
import { productInterface } from "@/interfaces/productInterface";
import Link from "next/link";
import { ImageSlider } from "./(Components)/ImageSlider";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const [products, setProducts] = useState<productInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<productInterface[]>([]);
  const [views, setViews] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const { cart, increment, decrement } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProductData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  const incrementView = (productId: string) => {
    setViews((prevViews) => ({
      ...prevViews,
      [productId]: (prevViews[productId] || 0) + 1,
    }));
  };

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Product Store
            </Link>
            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none ml-2 text-gray-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              {session ? (
                <div className="flex items-center space-x-4">
                  <div className="text-gray-800 font-medium">
                    Welcome, {session.user?.name || "User"}!
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Sign In
                  </button>
                </Link>
              )}
              <Link href="/cart" legacyBehavior>
                <a className="relative text-gray-700 hover:text-blue-600">
                  <ShoppingCart className="w-6 h-6" />
                  {Object.keys(cart).length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                      {Object.values(cart).reduce((acc, item) => acc + item.count, 0)}
                    </span>
                  )}
                </a>
              </Link>
            </nav>
          </div>
        </header>

        <ImageSlider />

        <main className="container mx-auto py-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                onMouseEnter={() => incrementView(product._id)}
              >
                <div className="relative">
                  <img
                    src={product.product_image }
                    alt={product.name}
                    className="object-cover h-60 w-full"
                  />
                  <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {views[product._id] || 0} Views
                  </span>
                </div>
                {/* <p>{product.product_image}</p> */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-1">₹{product.price.toFixed(2)}</p>
                  <div className="mt-4 flex items-center justify-between">
                    {cart[product._id] ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decrement(product)}
                          className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-gray-700 font-medium">{cart[product._id].count}</span>
                        <button
                          onClick={() => increment(product)}
                          className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => increment(product)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </SessionProvider>
  );
}
