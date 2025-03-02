import axios from "axios";

const BaseUrl = "http://localhost:3100";

export const getTests = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/tests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tests:", error);
    throw error;
  }
};

export const getTestById = async (testId: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/tests/${testId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching test with ID ${testId}:`, error);
    throw error;
  }
};

export const getSites = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/sites`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sites:", error);
    throw error;
  }
};
