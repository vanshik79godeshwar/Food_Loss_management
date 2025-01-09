"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

  return (
    <SignedOut>
      <div className="flex justify-center items-center h-screen">
        <SignInButton />
      </div>
    </SignedOut>
  );
}