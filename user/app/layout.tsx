import React from "react";
import "./globals.css";
import SessionWrapper from "@/app/(Components)/Session_Wrapper"
import { CartProvider } from "@/context/CartContext";
import { Session } from "inspector/promises";
export const metadata = {
  title: "My App",
  description: "A project using NextAuth for authentication",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <CartProvider>
      <html lang="en">
        <body>

          {children}
          </body>
      </html>
    </CartProvider>
    </SessionWrapper>
  );
}
