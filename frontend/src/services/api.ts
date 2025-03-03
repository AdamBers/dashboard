import axios from "axios";
import { ITest, ISite } from "../types";

const BaseUrl = "http://localhost:3100";

export const getTests = async (): Promise<ITest[]> => {
  try {
    const response = await axios.get(`${BaseUrl}/tests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tests:", error);
    throw error;
  }
};

export const getTestById = async (testId: string): Promise<ITest> => {
  try {
    const response = await axios.get(`${BaseUrl}/tests/${testId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching test with ID ${testId}:`, error);
    throw error;
  }
};

export const getSites = async (): Promise<ISite[]> => {
  try {
    const response = await axios.get(`${BaseUrl}/sites`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sites:", error);
    throw error;
  }
};
