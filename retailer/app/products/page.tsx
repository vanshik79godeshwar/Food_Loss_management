"use client";
import Products from '../(components)/product/ProductPage';
import React from 'react';
import Sidebar from '../(components)/Sidebar';

export default function Product() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 md:ml-64">
        <Products />
      </div>
    </div>
  );
}