import fs, { writeFile } from "fs";
import { mkdir } from 'fs';
import { retrieveTranslation } from "./translateFunction.js";


const folderPath = 'Archive/';
const language = {
    long: "Vietnamese",
    short: "vi"
};

async function translateAllSrtFilesInFolder(path, lang) {
    const filesInFolder = fs.readdirSync(path);
    const newPath = path + lang.long;
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
        const content = fs.readFileSync(`${path}${item}`, 'utf-8');
        // transalte and put in new folder
        retrieveTranslation(content, lang.long).then((data) => {
            writeFile(`${newPath}/${item.replace("-en", `-${lang.short}`)}`, data, (err) => {
                if (err) throw err;
                console.log(`${item} has been translated`);
            });
        })
    }
}
translateAllSrtFilesInFolder(folderPath, language);