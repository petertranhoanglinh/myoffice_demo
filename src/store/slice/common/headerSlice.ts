import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { MemberModel } from "@/app/models/member.mode";
import my_p
import { MyProgram } from "@/app/models/myprogram.model";

interface HeaderState {
  items: MyProgram[];
  loading: boolean;
  error: string | null;
}

const initialState: HeaderState = {
  items: [],
  loading: false,
  error: null
};

// Action để tìm kiếm thành viên từ API
export const searchMemberAction = createAsyncThunk(
  "searchHeader",
  async (query: any, { rejectWithValue }) => {
    try {
      const response = await memberService.searchMember(query);
      return response; // API trả về danh sách thành viên
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi tìm kiếm thành viên");
    }
  }
);

const memberSearchSlice = createSlice({
  name: "searchHeader",
  initialState,
  reducers: {}, // Không cần reducers khác
  extraReducers: (builder) => {
    builder
      .addCase(searchMemberAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMemberAction.fulfilled, (state, action: PayloadAction<MemberModel[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchMemberAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default memberSearchSlice.reducer;
