import axios from "axios";
import { MyProgram } from "../models/myprogram.model";

const api = "https://v611.wownet.biz/api/mymenu/REIZ";

const myProgramService = {
  async searchMyProgram(): Promise<MyProgram[]> {
    try {
      const response = await axios.get<MyProgram[]>(api);
      return response.data;
    } catch (error) {
      console.error("Error searching members:", error);
      throw error;
    }
  },
};

export default myProgramService;
