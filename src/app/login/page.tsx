"use client"; // Quan trọng: Để Next.js hiểu đây là Client Component
import { setIsHeader } from "@/store/slice/common/headerSlice";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Tắt Header khi vào trang LoginPay
    dispatch(setIsHeader(false));

    // Khi rời khỏi trang, bật lại Header nếu cần
    return () => {
      dispatch(setIsHeader(true));
    };
  }, [dispatch]);


 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token};`;
      window.location.href = "/"; // Điều hướng đến trang đăng nhập
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer">
            Login
          </button>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 mt-2 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
