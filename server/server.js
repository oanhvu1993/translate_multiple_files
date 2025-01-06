const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const path = require('path');
const cors = require('cors');
const fs = require('fs')
console.log("Server restart");
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

// const student = [];

// app.get('/api', (req, res) => {
//     // res.send("get request");
//     res.send({ fruits: ["apple", "orange", "strawberry"] });
// })

app.post('/api', upload.array('files'), (req, res) => {
    const files = req.files;
    const relativePaths = req.body.relativePaths;
    const filePath = path.resolve(process.cwd());
    console.log(files[0]);
    console.log(filePath);
    console.log(relativePaths[0]);
    // res.json({
    //     folder: path.dirname(directoryPaths[0]),
    //     files: directoryPaths,
    // });
});

app.post('/translate', (req, res) => {
    const { path } = req.body;
    const filesInFolder = fs.readdirSync(path, 'utf-8');
    const file = `${path}\\${filesInFolder[0]}`;
    const content = fs.readFileSync(file);
    console.log(content);
})

app.listen(8080, () => {
    console.log('server listening on port 8080')
})
