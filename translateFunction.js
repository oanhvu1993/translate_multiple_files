import { GoogleGenerativeAI } from "@google/generative-ai";

const AI_KEY = "AIzaSyDRDzwojrzz97W_UH8tq4q2EDR_uoTxRKg";

export const retrieveTranslation = async (text, language) => {
    //Choose key and model
    const genAI = new GoogleGenerativeAI(AI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    //Create request for AI
    const prompt = `Just show the result. Translate this to ${language} : ${text}`;
    //Run request
    const translateText = await model.generateContent(prompt);
    return translateText.response.text();
}

///////////// test code/////////////////////
// const lang = "Vietnamese";
// const test = ["Teacher", "School", "Home"];
// async function runAll() {
//     // Comment out or delete any sample cases you don't want to run.
//     for (const text of test) {
//         await retrieveTranslation(text, lang).then((data) => {
//             console.log(data);
//         });
//     }
//     // await retrieveTranslation("Teacher", lang);
//     // await retrieveTranslation("School", lang);
//     // await retrieveTranslation("Home", lang);

// }
// runAll();
