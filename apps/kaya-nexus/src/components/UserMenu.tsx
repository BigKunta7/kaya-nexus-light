"use client";
import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="relative inline-block text-left">
      <button className="flex items-center gap-2 focus:outline-none">
        <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
        <span className="text-gray-800 dark:text-gray-200">{user.email}</span>
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
