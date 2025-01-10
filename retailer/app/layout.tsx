import { SessionProvider } from "next-auth/react";
import "./globals.css";
import SessionWrapper from "@/app/(components)/Session_Wrapper"
export const metadata = {
  title: "My App",
  description: "A project using NextAuth for authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper >
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}