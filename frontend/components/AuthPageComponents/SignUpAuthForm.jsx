"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

export default function SignUPAuthForm() {
  const router = useRouter();
  const initialFormData = {
    name: "",
    email: "",
    role: "Student",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordError = (value) => {
    if (value.length < 4) return "Password must be 4 characters or more";
    if (!/[A-Z]/.test(value))
      return "Password needs at least 1 uppercase letter";
    if (!/[^a-zA-Z0-9]/.test(value)) return "Password needs at least 1 symbol";
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, role, password, confirmPassword, terms } = formData;

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!role) newErrors.role = "Role is required";
    if (!password) newErrors.password = "Password is required";
    if (getPasswordError(password))
      newErrors.password = getPasswordError(password);
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!terms) newErrors.terms = "Please accept the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, role, password },
        { withCredentials: true }
      );

      const loginResponse = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { user, token } = loginResponse.data;

      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      Cookies.set("role", user.role, { secure: true, sameSite: "Strict" });

      setSubmitted(true);
      toast.success("Signup successful! Redirecting...");

      router.push(
        role === "Student" ? "/welcome" : "/welcome"
      );
    } catch (error) {
      console.error(
        "Signup/Login failed",
        error.response?.data || error.message
      );
      setErrors({ email: error.response?.data?.message || "Signup failed" });
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="dark:text-white">
      <Toaster />
      <Form
        className="w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Input
          isRequired
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          errorMessage={errors.name}
        />
        <Input
          isRequired
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Enter your email"
          errorMessage={errors.email}
        />
        <Select
          isRequired
          name="role"
          value={formData.role}
          onChange={(e) => handleRoleChange(e.target.value)}
          placeholder="Select your role"
          errorMessage={errors.role}
        >
          <SelectItem key="Student" value="Student" className="dark:text-white">
            Student
          </SelectItem>
          <SelectItem key="Working Professional" value="Working Professional" className="dark:text-white">
            Working Professional
          </SelectItem>
        </Select>
        <Input
          isRequired
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          errorMessage={errors.password}
          endContent={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />
        <Input
          isRequired
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          errorMessage={errors.confirmPassword}
          endContent={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />
        <Checkbox name="terms" checked={formData.terms} onChange={handleChange} >
          <div className="dark:text-white">
          I accept the terms and conditions
          </div>
        </Checkbox>
        {errors.terms && <p className="text-red-500">{errors.terms}</p>}
        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Sign Up
          </Button>
          <Button
            className="w-full dark:text-white dark:bg-gray-500"
            type="reset"
            variant="bordered"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Form>
      {submitted && (
        <p className="text-green-500 mt-2">Signup successful! Redirecting...</p>
      )}
    </div>
  );
}
