import { useState } from "react";
import axios from 'axios';


export default function TranslateAppComponent() {
    const [input, setInput] = useState({
        path: "",
        lang: ""
    })
    const handleOnClick = async () => {
        await axios.post('http://localhost:8080/translate', { path: input.path, lang: input.lang })
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
        console.log(input)
    }
    return (
        <>
            <input type="file" name="" id="" />
            <label htmlFor="">Language</label>
            <input type="text" name="lang" id="" onChange={handleOnChange} value={input.lang} />
            <label htmlFor="">Path</label>
            <input type="text" name="path" value={input.path} onChange={handleOnChange} />
            <button onClick={handleOnClick}>Confirm Folder Path</button>
        </>
    )
}