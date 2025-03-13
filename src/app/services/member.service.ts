import axios from 'axios';

const apiUrl = '/api/member'; // API endpoint

export const saveMember = async (memberData: any): Promise<any | null> => {
  try {
    const response = await axios.post(apiUrl, memberData);
    return response.data; 
  } catch (error) {
    console.error('Error saving member:', error);
    return error; 
  }
};
