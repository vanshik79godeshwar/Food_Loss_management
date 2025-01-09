import { Cake, Milk, Carrot, ShoppingBag, Leaf } from "lucide-react";
import Image from "next/image";

const categories = [
	{ name: "Bakery", icon: Cake },
	{ name: "Dairy Products", icon: Milk },
	{ name: "Vegetables", icon: Carrot },
	{ name: "Groceries", icon: ShoppingBag },
	{ name: "Other", icon: Leaf },
];

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
			<header className="bg-white shadow-md">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">
						About Us
					</h1>
				</div>
			</header>

			<main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<section className="mb-16">
					<h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
						Our Mission
					</h2>
					<div className="bg-white rounded-lg shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
						<p className="text-xl text-gray-700 mb-6 leading-relaxed">
							At our core, we're committed to revolutionizing food
							delivery while combating one of the biggest
							challenges of our time: food wastage. Our innovative
							platform connects consumers with local retailers,
							ensuring that quality food reaches your table
							instead of landfills.
						</p>
						<p className="text-xl text-gray-700 leading-relaxed">
							By choosing us, you're not just enjoying delicious
							meals and products; you're actively participating in
							a sustainable food ecosystem. Together, we can make
							a significant impact on reducing food waste and
							creating a more sustainable future.
						</p>
					</div>
				</section>

				<section className="mb-16">
					<h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
						Our Categories
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{categories.map((category) => (
							<div
								key={category.name}
								className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 transition-all duration-300 hover:shadow-xl hover:scale-105"
							>
								<category.icon className="w-12 h-12 text-green-500" />
								<span className="text-xl font-semibold text-gray-800">
									{category.name}
								</span>
							</div>
						))}
					</div>
				</section>

				<section className="mb-16">
					<h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
						How It Works
					</h2>
					<div className="bg-white rounded-lg shadow-xl p-8">
						<ol className="list-decimal list-inside space-y-4 text-lg text-gray-700">
							<li>
								Browse our wide selection of products from local
								retailers.
							</li>
							<li>
								Place your order and choose a convenient
								delivery time.
							</li>
							<li>
								Our system optimizes routes to reduce carbon
								footprint.
							</li>
							<li>
								Enjoy fresh, high-quality food while helping to
								reduce waste.
							</li>
							<li>
								Rate your experience and help us improve our
								service.
							</li>
						</ol>
					</div>
				</section>

				<section>
					<h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
						Join Our Mission
					</h2>
					<div className="bg-green-600 rounded-lg shadow-xl p-8 text-center">
						<p className="text-2xl text-white mb-6">
							Be part of the solution. Start ordering today and
							help us minimize food wastage!
						</p>
						<button className="bg-white text-green-600 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105">
							Get Started
						</button>
					</div>
				</section>
			</main>

			<footer className="bg-gray-800 text-white py-8 mt-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<p>
						&copy; 2023 Food Delivery Service. All rights reserved.
					</p>
					<p className="mt-2">
						Together, we can make a difference in reducing food
						waste.
					</p>
				</div>
			</footer>
		</div>
	);
}
