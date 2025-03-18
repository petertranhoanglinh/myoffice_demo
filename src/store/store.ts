import { configureStore } from "@reduxjs/toolkit";
import commonReducers from "./slice/common"; // Import default từ index.ts
import memberReducers from "./slice/member"
export const store = configureStore({
  reducer: {
    ...commonReducers, // ✅ Giải cấu trúc để lấy reducer bên trong 
    ...memberReducers,
  },
});

// Export kiểu dữ liệu của store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
