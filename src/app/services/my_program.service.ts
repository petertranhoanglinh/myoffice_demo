import axios from 'axios';

import { MyProgram } from '../models/myprogram.model';

const apiUrl = '/api/my_program'; // URL của API bạn muốn gọi

export const getPrograms = async (): Promise<MyProgram[]> => {
  try {
    const response = await axios.get(apiUrl);
    // Check if response.data is an array
    if (Array.isArray(response.data.data)) {
      return response.data.data.map((item: any) => ({
        comId: item.COM_ID,
        prgId: item.PRG_ID,
        prgName: item.PRG_NAME,
        pid: item.P_ID, // Include PID
        prgKind: item.PRG_KIND,
        menuYn: item.MENU_YN,
        menuLv: item.MENU_LV, // Include MENU_LV
        sortNo: item.SORT_NO, // Include SORT_NO
        helpUrl: item.HELP_URL, // Include HELP_URL
        linkInfo: item.LINK_INFO,
        prgNameVn: item.PRG_NAME_VN, // Include PRG_NAME_VN
        prgNameEn: item.PRG_NAME_EN, // Include PRG_NAME_EN
        prgNameJp: item.PRG_NAME_JP, // Include PRG_NAME_JP
        prgNameCn: item.PRG_NAME_CN, // Include PRG_NAME_CN
        icon: item.ICON, // Include ICON
        workDate: item.WORK_DATE, // Include WORK_DATE
        workUser: item.WORK_USER, // Include WORK_USER
        popupYn: item.POPUP_YN, // Include POPUP_YN
        popupName: item.POPUP_NAME, // Include POPUP_NAME
        loginYn: item.LOGIN_YN, // Include LOGIN_YN
        cnt: item.CNT // Include CNT
      }));
    } else {
      console.error("Expected an array but got:", response.data);
      return []; // Return empty array if response is not an array.
    }
  } catch (error) {
    console.error("Error fetching programs:", error);
    return []; // Return an empty array if there's an error
  }
};
