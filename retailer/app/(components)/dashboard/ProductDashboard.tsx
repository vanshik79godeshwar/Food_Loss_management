'use client';  // Add this at the top since we're using client-side features

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Types
interface Product {
    name: string;
    price: number;
    expiry_date: Date;
    discount: number;
    retailer: string;
    createdAt: Date;
}

interface PriceDistributionData {
    range: string;
    count: number;
}

interface RetailerPieData {
    name: string;
    value: number;
}

interface DiscountData {
    price: number;
    discount: number;
}

// Generate dummy data
const generateDummyData = (): Product[] => {
  const retailers: string[] = ['Store A', 'Store B', 'Store C', 'Store D'];
  const products: string[] = ['Apple', 'Banana', 'Orange', 'Milk', 'Bread', 'Cheese', 'Eggs'];
  const data: Product[] = [];
  
  for (let i = 0; i < 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));
    
    data.push({
      name: products[Math.floor(Math.random() * products.length)],
      price: Math.floor(Math.random() * 50) + 10,
      expiry_date: date,
      discount: Math.floor(Math.random() * 30),
      retailer: retailers[Math.floor(Math.random() * retailers.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
    });
  }
  return data;
};

const ProductDashboard: React.FC = () => {
  const dummyData = generateDummyData();
  
  // Prepare data for price distribution chart
  const priceDistribution = dummyData.reduce<Record<string, number>>((acc, item) => {
    const priceRange = `$${Math.floor(item.price/10) * 10}-${Math.floor(item.price/10) * 10 + 10}`;
    acc[priceRange] = (acc[priceRange] || 0) + 1;
    return acc;
  }, {});
  
  const priceDistributionData: PriceDistributionData[] = Object.entries(priceDistribution).map(([range, count]) => ({
    range,
    count
  }));

  // Prepare data for retailer distribution
  const retailerData = dummyData.reduce<Record<string, number>>((acc, item) => {
    acc[item.retailer] = (acc[item.retailer] || 0) + 1;
    return acc;
  }, {});
  
  const retailerPieData: RetailerPieData[] = Object.entries(retailerData).map(([name, value]) => ({
    name,
    value
  }));

  // Prepare data for discount vs price scatter
  const discountData: DiscountData[] = dummyData.map(item => ({
    price: item.price,
    discount: item.discount
  }));

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Product Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Price Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Retailer Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Products by Retailer</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={retailerPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price vs Discount Scatter */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Price vs Discount Correlation</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={discountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="price" label={{ value: 'Price ($)', position: 'bottom' }} />
                <YAxis label={{ value: 'Discount (%)', angle: -90, position: 'left' }} />
                <Tooltip />
                <Line type="monotone" dataKey="discount" stroke="#ff7300" dot={{ fill: '#ff7300' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Days Until Expiry Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Days Until Expiry</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dummyData.map(item => ({
                  name: item.name,
                  daysUntilExpiry: Math.ceil((new Date(item.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="daysUntilExpiry" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;