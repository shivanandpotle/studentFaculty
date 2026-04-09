"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function StudentSignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // For demo purposes, simulate successful signup
    // In a real app, this would create an account
    router.push("/student/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="max-w-md w-full rounded-3xl border border-outline p-10 bg-surface-container-high shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Student Sign Up</h1>
          <p className="text-sm text-on-surface-variant">
            Create your student account
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-on-surface mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-low text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-low text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="your.email@university.edu"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-on-surface mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-low text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-on-surface mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-low text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && (
            <div className="text-error text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link href="/student/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-on-surface-variant hover:text-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}