import { useState } from 'react';

const FileReaderExample = () => {
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            // Read file content as text
            reader.onload = (e) => {
                setFileContent(e.target.result);
                setFileName(file.name);
            };

            reader.onerror = (e) => {
                console.error('Error reading file:', e);
            };

            reader.readAsText(file); // Use readAsText for text files
        }
    };

    return (
        <div>
            <h2>Select a File to Read</h2>
            <input type="file" onChange={handleFileSelect} />
            {fileName && (
                <div>
                    <h3>File Name: {fileName}</h3>
                    <h4>Content:</h4>
                    <pre>{fileContent}</pre>
                </div>
            )}
        </div>
    );
};

export default FileReaderExample;
