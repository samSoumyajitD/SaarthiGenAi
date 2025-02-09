"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SignUpAuthForm from "./SignUpAuthForm"
import LoginAuthForm from "./LogInAuth"
import { motion } from "framer-motion"
import { FlipWordsDemo } from "./AuthPageContent"

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState("login")
  const searchParams = useSearchParams()

  useEffect(() => {
    const form = searchParams.get('form')
    if (form === 'login' || form === 'signup') {
      setActiveForm(form)
    }
  }, [searchParams])

  return (
    <div className="flex flex-col sm:flex-row mt-[10px] md:mt-[20px] items-center justify-center px-4 bg-white dark:bg-gray-900">
      {/* FlipWords Section (Fixed Height to Prevent Shift) */}
      <div className="mr-0 md:mr-[20px]">     
        <div className="mx-auto text-xl font-[600] dark:text-white tracking-widest">
          Roll the Carpet.!
        </div>
        <div className="flex-col flex">
          <FlipWordsDemo />
        </div>
      </div>

      {/* Auth Container */}
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl dark:shadow-7xl rounded-xl pt-2 pr-5 pl-5 pb-6 transition-all duration-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Toggle Buttons */}
        <div className="flex mb-4 p-1 bg-gray-100 dark:bg-gray-400 rounded-[4px]">
          {["login", "signup"].map((type) => (
            <motion.button
              key={type}
              className={`flex-1 py-2 text-sm font-semibold rounded-[2px] transition-all duration-300 group ${
                activeForm === type
                  ? "bg-gray-900 text-white shadow-lg"
                  : "text-gray-600 dark:text-black hover:text-gray-800 dark:hover:text-white"
              }`}
              onClick={() => setActiveForm(type)}
              whileTap={{ scale: 0.98 }}
            >
              {type === "login" ? "Login" : "Sign Up"}
            </motion.button>
          ))}
        </div>

        {/* Forms (Fixed Min Height to Prevent Shifting) */}
        <div className="relative h-[350px]">
          <motion.div
            key={activeForm}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeForm === "login" ? <LoginAuthForm /> : <SignUpAuthForm />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}