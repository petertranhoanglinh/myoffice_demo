"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ReactNode, useEffect } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.className = theme; // Thay đổi class của <html>
  }, [theme]);

  return <>{children}</>;
}
