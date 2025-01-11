'use client'
import { signIn } from 'next-auth/react'
import { Github, Mail } from 'lucide-react'

export function SignInButtons() {
  return (
    <div className="mt-8 space-y-4">
      <button
        onClick={() => signIn('google')}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <Mail className="w-5 h-5 mr-2" />
        Sign in with Google
      </button>
      <button
        onClick={() => signIn('github')}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <Github className="w-5 h-5 mr-2" />
        Sign in with GitHub
      </button>
    </div>
  )
}