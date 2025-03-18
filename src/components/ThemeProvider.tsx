"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ReactNode, useEffect } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const body = document.body;
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
