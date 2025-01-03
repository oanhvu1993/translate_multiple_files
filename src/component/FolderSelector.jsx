import { useState } from 'react';

const FolderSelector = () => {
    const [files, setFiles] = useState([]);

    const handleFolderSelect = (event) => {
        const selectedFiles = Array.from(event.target.files);
        console.log(selectedFiles)
        const filePaths = selectedFiles.map((file) => file.webkitRelativePath);
        setFiles(filePaths);
    };

    return (
        <div>
            <h2>Select a Folder</h2>
            <input
                type="file"
                webkitdirectory="true"
                directory=""
                onChange={handleFolderSelect}
            />
            {files.length > 0 && (
                <div>
                    <h3>Files in Selected Folder:</h3>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>{file}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FolderSelector;
