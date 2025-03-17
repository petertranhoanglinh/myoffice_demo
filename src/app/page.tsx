"use client"; // Đảm bảo Next.js hiểu đây là component phía client
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { increment, decrement } from "@/store/slice/common/counterSlice";
import { toggleTheme } from "@/store/slice/common/themeSlice";

const Home: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>

      <h2>Current Theme: {theme}</h2>
      <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
    </div>
  );
};

export default Home;
