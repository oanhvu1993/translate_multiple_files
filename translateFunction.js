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

// export const retrieveTranslation = async (text, language) => {
//     const genAI = new GoogleGenerativeAI(key);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

//     // Retry logic with exponential backoff
//     const fetchWithRetry = async (retries = 5, delay = 1000) => {
//         for (let i = 0; i < retries; i++) {
//             try {
//                 // Create request for AI
//                 const prompt = `Just show the result and keep the same format. Translate this to ${language} : ${text}`;
//                 const translateText = await model.generateContent(prompt);
//                 return translateText.response.text(); // Success
//             } catch (error) {
//                 if (error.response && error.response.status === 429 && i < retries - 1) {
//                     console.log(`Rate limit hit. Retrying after ${delay}ms...`);
//                     await new Promise((resolve) => setTimeout(resolve, delay));
//                     delay *= 2; // Exponential backoff
//                 } else {
//                     console.error("Error during translation");
//                     throw error; // Re-throw if it's not a rate limit error or retries are exhausted
//                 }
//             }
//         }
//     };

//     // Call the fetchWithRetry function
//     return await fetchWithRetry();
// };




///////////// test code/////////////////////
// const lang = "Vietnamese";
// const test = ["Teacher", "School", "Home"];
// async function runAll() {
//     // Comment out or delete any sample cases you don't want to run.
//     for (const text of test) {
//         retrieveTranslation(text, lang).then((data) => {
//             console.log(data);
//         });
//     }
//     // await retrieveTranslation("Teacher", lang);
//     // await retrieveTranslation("School", lang);
//     // await retrieveTranslation("Home", lang);

// }
// runAll();
