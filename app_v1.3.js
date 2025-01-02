import fs, { writeFile } from "fs";
import { retrieveTranslation } from "./translateFunction.js";
import { configDotenv } from "dotenv";

configDotenv();
////// Variable Declare////////////
const folderPath = process.env.FOLDER_PATH;
const language = {
    outputName: process.env.OUTPUT_LANGUAGE_NAME,
    outputCode: process.env.OUTPUT_LANGUAGE_CODE,
    inputCode: process.env.INPUT_LANGUAGE_CODE
}

const failedFiles = []; //contain files that fail to execute
const filesInFolder = fs.readdirSync(folderPath, { recursive: true }).map((file) => `${folderPath}/${file}`);
//////////////////Get only SRT files//////////////////
const inputSrtFiles = filesInFolder.filter((file) => { return file.endsWith(`${language.inputCode}.srt`) })
///////////////////Extract file name////////////////////
function getFileName(path) {
    return path.split(/\\|\//).pop();
}
///////////////Delay function/////////////////////
async function delay(second, showNumber) {
    for (let i = second; i > 0; i--) {
        if (showNumber == true) console.log(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
//////////////
// Translate function with parameter is an array of file paths and an language input as param object{outputName, outputCode, inputCode }

async function translateAllSrtFilesInFolder(arraySource, lang) {
    console.log(`Translating ${arraySource.length} files.........`)
    //Delay just for fun
    await delay(3, false);
    //create promise to fullfil
    const promises = [];
    ////////////////Commit action translate//////////////////
    for (const item of arraySource) {
        const newItem = item.replace(`${lang.inputCode}.srt`, `${lang.outputCode}.srt`);
        if (filesInFolder.includes(newItem)) {
            console.log(`File already exist: ${getFileName(newItem)}`);
            continue;
        }
        console.log(`Translating file: ${getFileName(item)}`)
        // retrieve content in srt file
        const content = fs.readFileSync(`${item}`, 'utf-8');
        // transalte and put in new folder
        const translatePromise = (async () => {
            try {
                const translateText = await retrieveTranslation(content, lang.outputName)
                console.log(`${getFileName(item)} has been translated`);
                writeFile(`${newItem}`, translateText, (err) => {
                    if (err) throw err;
                });
            } catch (error) {
                failedFiles.push(item)
                console.error(`Failed to translate file: ${getFileName(item)}`)
            }
        })();
        promises.push(translatePromise);
    }
    // wait for loop complete
    await Promise.all(promises);
    //Log result in console
    console.log(`${arraySource.length - failedFiles.length} out of ${arraySource.length} files has been translated`);
}
/////////Execute function: automatic retry when any file failed to execute due to limit request/////
async function processFolder() {
    while (true) {
        await translateAllSrtFilesInFolder(inputSrtFiles, language);
        if (failedFiles.length === 0) {
            console.log("All files translated successfully!");
            break;
        } else {
            //////Reset input as an array of failed files
            inputSrtFiles.length = 0;
            inputSrtFiles.push(...failedFiles);
            failedFiles.length = 0;
            ////Delay for fun
            console.log("Retry failed files in: ");
            await delay(15, true);
        }
    }
}
processFolder();
