import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: "My App",
  description: "A project using Clerk for authentication",
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
    </CartProvider>
  );
}