import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { MyProgram } from "@/app/models/myprogram.model";
import myProgramService from "@/app/services/my_program.service";

interface HeaderState {
  items: MyProgram[];
  loading: boolean;
  error: string | null;
  isHeader: boolean
}

const initialState: HeaderState = {
  items: [],
  loading: false,
  error: null ,
  isHeader : true
};

// Action để tìm kiếm thành viên từ API
export const searchMyProgramAction = createAsyncThunk(
  "searchHeader",
  async (query: any, { rejectWithValue }) => {
    try {
      const response = await myProgramService.searchMyProgram();
      return response; // API trả về danh sách thành viên
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi tìm kiếm thành viên");
    }
  }
);

const myProgramSlice = createSlice({
  name: "searchHeader",
  initialState,
  reducers: { 
   setIsHeader(state, action: PayloadAction<boolean>) {
    state.isHeader = action.payload;
  },}, // Không cần reducers khác
  extraReducers: (builder) => {
    builder
      .addCase(searchMyProgramAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMyProgramAction.fulfilled, (state, action: PayloadAction<MyProgram[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchMyProgramAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});
export const { setIsHeader } = myProgramSlice.actions;
export default myProgramSlice.reducer;
