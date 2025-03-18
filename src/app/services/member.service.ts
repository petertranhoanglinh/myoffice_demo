import axios from "axios";
import { MemberModel } from "../models/member.mode";

const apiUrl = "/api/member"; // API endpoint
const apiMemberSearch = "https://v611.wownet.biz/api/member/search";

const memberService = {
  // API tạo thành viên
  async saveMember(memberData: any): Promise<any | null> {
    try {
      const response = await axios.post(apiUrl, memberData);
      return response.data;
    } catch (error) {
      console.error("Error saving member:", error);
      throw error; // Nên throw để xử lý lỗi phía trên
    }
  },

  // API tìm kiếm thành viên
  async searchMember(query: any): Promise<MemberModel[]> {
    try {
      const response = await axios.post<MemberModel[]>(apiMemberSearch, query);
      return response.data;
    } catch (error) {
      console.error("Error searching members:", error);
      throw error;
    }
  },
};

export default memberService;
