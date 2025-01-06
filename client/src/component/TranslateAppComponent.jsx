import { useState } from "react";
import axios from 'axios';


export default function TranslateAppComponent() {
    const [inputPath, setInputPath] = useState('');
    const handleOnClick = async () => {
        const path = inputPath
        await axios.post('http://localhost:8080/translate', { path })
    }
    const handleOnChange = (e) => {
        setInputPath(e.target.value);
    }
    return (
        <>
            <input type="file" name="" id="" />
            <input type="text" value={inputPath} onChange={handleOnChange} />
            <button onClick={handleOnClick}>Confirm Folder Path</button>
        </>
    )
}