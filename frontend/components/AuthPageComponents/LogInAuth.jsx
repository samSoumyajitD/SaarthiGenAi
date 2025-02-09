"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 
import { Toaster, toast } from "react-hot-toast"; // Import react-hot-toast

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const newErrors = {};
    if (!email) newErrors.email = "Please enter your email";
    if (!password) newErrors.password = "Please enter your password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", 
        data,
        { withCredentials: true }
      );

      const { user, token } = response.data;

      // Store in cookies
      Cookies.set("user", JSON.stringify(user), { secure: true, sameSite: "Strict" });
      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      Cookies.set("role", user.role, { secure: true, sameSite: "Strict" });

      setSubmitted(true);
      
      // Show success toast notification
      toast.success(`Welcome, ${user.role}! Redirecting...`, {
        duration: 3000,
        position: "top-right",
        style: {
          borderRadius: "8px",
          background: "#4CAF50",
          color: "#fff",
        },
      });

      // Redirect after a short delay
      setTimeout(() => {
        if (user.role === "Student") {
          router.push("/welcome");
        } else if (user.role === "Working Professional") {
          router.push("/welcome");
        }
      }, 2000);
      
    } catch (error) {
      setErrors({ apiError: error.response?.data?.message || "Login failed" });
      toast.error("Login failed! Please check your credentials.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="dark:text-white mt-3">
      <Toaster /> {/* Toast notification container */}
      
      <Form
        className="w-full max-w-md space-y-4"
        onSubmit={onSubmit}
        onReset={() => {
          setEmail("");
          setPassword("");
          setErrors({});
          setSubmitted(false);
        }}
      >
        <Input
          isRequired
          name="email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onValueChange={setEmail}
          errorMessage={errors.email}
        />
        
        <Input
          isRequired
          name="password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={password}
          onValueChange={setPassword}
          errorMessage={errors.password}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <span className="ml-2">Show Password</span>
        </div>

        {errors.apiError && <div className="text-danger text-small">{errors.apiError}</div>}

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Login
          </Button>
          <Button className="w-full dark:text-white dark:bg-gray-500" type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
