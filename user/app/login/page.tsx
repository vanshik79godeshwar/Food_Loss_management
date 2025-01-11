"use client"
import {useSession ,signIn} from 'next-auth/react';
import React from "react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignInButtons } from './SignButton';
const page = () => {
  const {data:session}=useSession();
  const router = useRouter();
  if(session){
    localStorage.setItem("user",JSON.stringify(session.user))
    router.push('/');
  }

  useEffect(() => {
    document.title="Login - Foodie_Market"
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your preferred sign-in method
          </p>
        </div>
        <SignInButtons />
      </div>
    </div>
  )
}
export default page;