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
      <h1>Welcome to my project</h1>
      <SignedIn>
        <p>You're signed in!</p>
        <p>Your email address is {email || "No email found"}</p>
        <button onClick={() => router.push("/dashboard")}>Go to dashboard</button>
        <p>Your profile picture:</p>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt="profile picture" width={100} height={100} />
        ) : (
          <p>No profile picture available</p>
        )}
      </SignedIn>
      <SignedOut>
        <p>You're signed out!</p>
        <SignInButton />
      </SignedOut>
    </>
  );
}
