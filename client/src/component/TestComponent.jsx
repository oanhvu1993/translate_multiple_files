import fs from 'fs';

export default function TestComponent() {
    const folderPath = 'Archive';
    const fileInFolder = fs.readdirSync(folderPath);
    console.log(fileInFolder);
    return (
        <>
        </>
    )
}