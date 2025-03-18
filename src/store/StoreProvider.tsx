// src/store/StoreProvider.tsx
"use client"; 

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store"; // Kiểm tra đường dẫn!

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
