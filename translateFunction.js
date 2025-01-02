import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";
configDotenv();
const key = process.env.API_AI_KEY;

export const retrieveTranslation = async (text, language) => {
    //Choose key and model
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    //Create request for AI
    const prompt = `Just show the result. Translate this to ${language} : ${text}`;
    //Run request
    const translateText = await model.generateContent(prompt);
    return translateText.response.text();
}
