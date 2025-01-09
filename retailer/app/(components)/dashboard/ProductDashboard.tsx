"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import {getPriceDistribution,retailerDistribution,discountData,daysUntilExpiry} from "@/server_actions/Retailer"

export interface PriceDistribution {
  range: string;
  count: number;
}
export interface RetailerPieData {
  name: string;
  value: number;
}
export interface DiscountData {
  price: number;
  discount: number;
}
export interface ExpiryData {
  name: string;
  daysUntilExpiry: number;
}

const ProductDashboard: React.FC = () => {
  const [priceDistributionData, setPriceDistributionData] = useState<PriceDistribution[]>([]);
  const [retailerPieData, setRetailerPieData] = useState<RetailerPieData[]>([]);
  const [discountsData, setDiscountsData] = useState<DiscountData[]>([]);
  const [expiryData, setExpiryData] = useState<ExpiryData[]>([]);

  useEffect(() => {
    // Fetch price distribution data
    let data1 = getPriceDistribution();
    data1.then((data)=>{
      setPriceDistributionData(data);
    });

    // Fetch retailer distribution data
    let data2 = retailerDistribution();
    data2.then((data)=>{
      setRetailerPieData(data);
    });

    // Fetch discount data
    let data3 = discountData();
    data3.then((data)=>{
      setDiscountsData(data);
    });

    // Fetch expiry data
    let data4 = daysUntilExpiry();
    data4.then((data)=>{
      setExpiryData(data);
    });
    
    
  }, []);

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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Price vs Discount Correlation</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={discountsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="price" label={{ value: 'Price ($)', position: 'bottom' }} />
                <YAxis label={{ value: 'Discount (%)', angle: -90, position: 'left' }} />
                <Tooltip />
                <Line type="monotone" dataKey="discount" stroke="#ff7300" dot={{ fill: '#ff7300' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Days Until Expiry</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expiryData}>
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
