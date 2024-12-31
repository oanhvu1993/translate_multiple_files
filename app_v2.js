import fs, { mkdir, writeFile } from 'fs'
import { retrieveTranslation } from './translateFunction.js';



const folderPath = 'Archive';
const language = {
    long: "Vietnamese",
    short: "vi"
};

/////////////////Read Folder////////////////////
const filesInFolder = fs.readdirSync(folderPath);
////////////////Filter SRT file///////////////////
const srtFiles = filesInFolder.filter(function (file) {
    return file.endsWith('.srt');
});
///////////////Create Translated Folder////////////////
mkdir(`${folderPath}/${language.long}`, { recursive: true }, (err) => {
    if (err) throw err;
});

async function translateSrtFile(folderPath, fileName, lang) {
    const path = `${folderPath}/${fileName}`
    ////////////Read srt file/////////////
    const content = fs.readFileSync(path, "utf-8");
    ////////////Get only text content///////////
    const segments = content.split(/\r\r\n\s+|\r\n\r\n\r\n\r\n/).filter((item) => item != "").map((item) => item.split(/\r\r\n|\r\n\r\n/))
    const textOnlySegments = segments.map((item) => item[2])
    ///////////////Translated text content////////////
    for (const text of textOnlySegments) {
        await retrieveTranslation(text, lang.long).then((data) => {
            const index = textOnlySegments.indexOf(text);
            textOnlySegments[index] = data;
            // console.log(data)
        })
    }
    /////////////Combine translated text with id and timestamp////////////
    const newSegments = segments.map((item, index) =>
        [item[0], item[1], textOnlySegments[index]].join("\r\n\r\n")
    )
    const newContent = newSegments.join("\r\n\r\n\r\n");
    ////////////////Write content to new file///////////////////
    writeFile(`${folderPath}/${lang.long}/${fileName.replace("-en", `-${lang.short}`)}`, newContent, (err) => {
        if (err) throw err;
        console.log(`${fileName} has been translated`);
    });
    // console.log(newContent)
}

for (const file of srtFiles) {
    translateSrtFile(folderPath, file, language)
}


