import axios from "axios";
import { useState } from "react";

export default function ConnectServerComponent() {
    const [data, setData] = useState("")
    const getApi = () => {
        axios.get('http://localhost:8080/api').then((res) => {
            console.log(res);
        })
    }
    const postApi = async () => {
        if (data.length === 0) return;

        const formData = new FormData();
        data.forEach((file) => {
            formData.append('files', file);
            formData.append('relativePaths', file.webkitRelativePath);
        });

        await axios.post('http://localhost:8080/api', formData).then((res) => {
            console.log(res.data);
        })
    }

    const handleOnchange = (e) => {
        const files = Array.from(e.target.files);
        setData(files);
        console.log(files);
    }
    return (
        <>
            <button onClick={getApi}>Get API</button>
            <input type="file"
                webkitdirectory="true"
                // directory=""
                onChange={handleOnchange}
            />
            <button onClick={postApi}>Post API</button>

        </>
    )
}