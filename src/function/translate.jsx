import { GoogleGenerativeAI } from "@google/generative-ai";
import PropTypes from 'prop-types';


translate.propTypes = {
    text: PropTypes.string
}

export async function translate(text) {
    const key = import.meta.env.VITE_API_AI_KEY;
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Just show the result. Translate this to Vietnamese: ${text}`
    const result = await model.generateContent(prompt);
    // console.log(result.response.text())
    return result;
}