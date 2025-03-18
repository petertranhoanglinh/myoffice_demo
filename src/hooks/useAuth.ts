
import { useState, useEffect } from "react";
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.includes("token="); // Kiểm tra cookie có token hay không
    setIsLoggedIn(token);
    setLoading(false);
  }, []);

  return { isLoggedIn, loading };
}
