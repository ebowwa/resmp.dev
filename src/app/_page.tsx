"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase-server"
import styles from "./styles.module.css"

export default function Waitlist() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = await createClient()
      const { error } = await supabase.from("waitlist").insert({ email })
      if (error) throw error
      setSuccess(true)
    } catch (err) {
      setError("Failed to join waitlist")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${styles.rtReset} flex flex-col items-center justify-center min-h-screen`}>
      <h1 className={`${styles.rtHeading} text-4xl font-bold mb-4`}>Join the Waitlist</h1>
      <form onSubmit={handleSubmit} className={`${styles.rtReset} flex flex-col gap-4 max-w-md w-full`}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`${styles.rtReset} px-4 py-2 border border-gray-300 rounded`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`${styles.rtReset} px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50`}
        >
          {loading ? "Joining..." : "Join Waitlist"}
        </button>
        {success && <p className={`${styles.rtReset} text-green-500`}>Successfully joined the waitlist!</p>}
        {error && <p className={`${styles.rtReset} text-red-500`}>{error}</p>}
      </form>
    </div>
  )
}