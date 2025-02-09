"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call backend logout API to clear HttpOnly cookies
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

      // Remove client-side cookies (if any)
      Cookies.remove("token", { path: "/" });
      Cookies.remove("user", { path: "/" });
      Cookies.remove("role", { path: "/" });

      // Redirect to the root path ("/")
      router.push("/");
      router.refresh();
      window.location.reload(); // Ensures session is cleared
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;