import axios from "axios";

const apiUrl = "http://localhost:3100/tests"; // Фейковый API на JSON Server

// Функция для получения всех тестов
export const getTests = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching tests:", error);
    throw error;
  }
};

// Функция для получения данных конкретного теста
export const getTestById = async (testId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${testId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching test with ID ${testId}:`, error);
    throw error;
  }
};
