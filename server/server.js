import express, { json } from 'express';
const app = express();
import multer, { memoryStorage } from 'multer';
const upload = multer({ storage: memoryStorage() });
import { resolve } from 'path';
import cors from 'cors';
import { readdirSync, readFileSync, writeFile } from 'fs';
import { retrieveTranslation } from './function/translateFunction.js';

console.log("Server restart");
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(json());

// const student = [];

// app.get('/api', (req, res) => {
//     // res.send("get request");
//     res.send({ fruits: ["apple", "orange", "strawberry"] });
// })

app.post('/api', upload.array('files'), (req, res) => {
    const files = req.files;
    const relativePaths = req.body.relativePaths;
    const filePath = resolve(process.cwd());
    console.log(files[0]);
    console.log(filePath);
    console.log(relativePaths[0]);
    // res.json({
    //     folder: path.dirname(directoryPaths[0]),
    //     files: directoryPaths,
    // });
});
const data = {
    path: "",
    lang: "",
    key: "AIzaSyCF5QlWp_5q3AQTcNj6g46l3A2UZFHI37c"
}
app.post('/translate', async (req, res) => {
    const { path, lang } = req.body;
    data.lang = lang;
    data.path = path;
    const filesInFolder = readdirSync(path, 'utf-8');
    const file = `${path}\\${filesInFolder[0]}`;
    const newFile = file.replace("en.srt", "vi.srt");
    const content = readFileSync(file, 'utf-8');
    res.json({ message: "Translating" });
    await retrieveTranslation(content, data.lang, data.key).then((res) => {
        console.log("Done");
        writeFile(newFile, res, (err) => {
            if (err) throw err;
        })
    });
    // console.log(data);
})

app.listen(8080, () => {
    console.log('server listening on port 8080')
})
