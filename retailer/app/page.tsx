"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "./components/Sidebar";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser(); // Access `user` object
  const router = useRouter();

  const email = user?.emailAddresses?.[0]?.emailAddress; 
  const profileImageUrl = user?.profileImageUrl; 

  console.log("image url:", profileImageUrl);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <div>
        
      </div>
    </>
  );
}
