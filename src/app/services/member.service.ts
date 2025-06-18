import axios from "axios";
import { MemberModel } from "../models/member.mode";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

const memberService = {
  // API tạo thành viên
  async saveMember(memberData: any): Promise<any | null> {
    try {
      const response = await axios.post(apiUrl, memberData);
      return response.data;
    } catch (error) {
      console.error("Error saving member:", error);
      throw error; 
    }
  },
  async searchMember(query: any): Promise<MemberModel[]> {
    try {
      const response = await axios.post<MemberModel[]>(apiUrl , query);
      return response.data;
    } catch (error) {
      console.error("Error searching members:", error);
      throw error;
    }
  },
};

export default memberService;
