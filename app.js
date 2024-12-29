import fs, { writeFile } from "fs";
import { mkdir } from 'fs';
import { retrieveTranslation } from "./translateFunction.js";

// import crypto from 'crypto'
/**
 * @param {string} language
 */
// var files = fs.readdirSync('project_translate/Archive/');
// console.log(files)

const folderPath = 'Archive/';
const language = "Vietnamese";

async function translateAllSrtFilesInFolder(path, lang) {
    const filesInFolder = fs.readdirSync(path);
    const newPath = folderPath + language;
    //////////////////Create Folder Contain Translate Files//////////////////
    mkdir(newPath, { recursive: true }, (err) => {
        if (err) throw err;
    });


    //////////////////Get only SRT files//////////////////
    const srtFiles = filesInFolder.filter(function (file) {
        return file.endsWith('.srt');
    });


    ////////////////Commit action translate//////////////////
    for (const item of srtFiles) {
        // retrieve content in srt file
        const content = fs.readFileSync(`${folderPath}${item}`, 'utf-8');
        // transalte and put in new folder
        await retrieveTranslation(content, lang).then((data) => {
            writeFile(`${newPath}/${item.replace("-en", "-vi")}`, data, (err) => {
                if (err) throw err;
                console.log(`${item} has been translated`);
            });
        })
    }


}
translateAllSrtFilesInFolder(folderPath, language);