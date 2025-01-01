import fs, { writeFile } from "fs";
import { retrieveTranslation } from "./translateFunction.js";
import { configDotenv } from "dotenv";

configDotenv();
const folderPath = process.env.FOLDER_PATH;
const language = {
    name: process.env.LANGUAGE_NAME,
    code: process.env.LANGUAGE_CODE
}

async function translateAllSrtFilesInFolder(path, lang) {
    const filesInFolder = fs.readdirSync(path, { recursive: true });

    //////////////////Get only SRT files//////////////////
    const srtFiles = filesInFolder.filter(function (file) {
        return file.endsWith('.srt');
    });

    // console.log(srtFiles)

    ////////////////Commit action translate//////////////////
    for (const item of srtFiles) {
        // retrieve content in srt file
        const content = fs.readFileSync(`${path}/${item}`, 'utf-8');
        // transalte and put in new folder
        retrieveTranslation(content, lang.name).then((data) => {
            writeFile(`${path}/${item.replace("en.srt", `${lang.code}.srt`)}`, data, (err) => {
                if (err) throw err;
                console.log(`${item} has been translated`);
            });
        })
    }
}
translateAllSrtFilesInFolder(folderPath, language);
