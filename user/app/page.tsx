"use client"
import Image from 'next/image';
import { ShoppingCart, Search } from 'lucide-react';
import { ImageSlider } from '@/app/(Components)/ImageSlider';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'; // Import Clerk components

const products = [
  {
    id: 1,
    name: 'Fresh Veggie Salad',
    price: '$12.99',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
  {
    id: 2,
    name: 'Gourmet Burger',
    price: '$15.99',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Artisan Pizza',
    price: '$18.99',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  },
  {
    id: 4,
    name: 'Tropical Smoothie',
    price: '$8.99',
    image: 'https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Exotic Dessert Platter',
    price: '$22.99',
    image: 'https://images.unsplash.com/photo-1553452118-621e1f860f43?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function Home() {
  const { isSignedIn, user } = useUser(); // Use Clerk's useUser hook

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Foodie Market</h1>
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <Search className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                2
              </span>
            </a>
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <UserButton /> {/* Clerk's UserButton component */}
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

      <ImageSlider />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Taste the Luxury</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Indulge in premium food products crafted for flavor and experience. Elevate your meals to the next level.
          </p>
        </section>

        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            gridAutoRows: 'minmax(250px, auto)',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
            >
              <div className="relative h-48 md:h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-700 font-medium text-base mb-4">
                  Price: <span className="text-red-600 font-bold">{product.price}</span>
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Experience the delight of {product.name}. Perfect for connoisseurs of flavor and style.
                </p>
                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
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
