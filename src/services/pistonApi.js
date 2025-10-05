import axios from "axios";
import { LANGUAGES } from "../constants/languages";

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

export const executeCode = async (languageId, code) => {
  const languageInfo = LANGUAGES.find(lang => lang.id === languageId);

  if (!languageInfo) {
    throw new Error(`Language '${languageId}' not supported.`);
  }

  try {
    const response = await axios.post(PISTON_API_URL, {
      language: languageInfo.pistonName,
      version: languageInfo.version,
      files: [{ content: code }],
    });
    return response.data;
  } catch (error) {
    // Handle cases where the API call itself fails
    console.error("API execution error:", error);
    throw new Error(error.response?.data?.message || "Failed to execute code.");
  }
};