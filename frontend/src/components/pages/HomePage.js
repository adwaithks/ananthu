import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {

    const [data, setData] = useState({})
    const [image, setImage] = useState('')

    useEffect(() => {
        async function fetchStats() {
            const response = await fetch('http://localhost:5500/getstats');
            const stats = await response.json();
            setData(stats);
            console.log(stats);
        }
        fetchStats();
    }, [])

    const handleImgSubmit = (e) => {
        e.preventDefault();
        console.log(image)
    fetch("http://localhost:5500/imgupload", {
      method: "POST",
      headers: {
        "Content-Type": "image/png"
      },
      body: image
    }).then(() => {
      console.log("Image uploaded successfully!")
    }).catch(error => {
      console.log(error);
    });

    }

    return (
        <div className="text-center">
            {
                <div>
                    <h1>Temperature: {data.temperature}</h1>
                    <h1>Humidity: {data.humidity}</h1>
                    <h1>Sag: {data.sag}</h1>
                </div>
            }
            <Link to="/">
                <button className="primary-button">Log out</button>
            </Link>
            <form onSubmit={handleImgSubmit}>
                <label for="img">Select image:</label>
                <input type="file" name="file" onChange={e => {
                    console.log(e.target.files[0])
                    setImage(e.target.files[0])}} accept="image/*" />
                <input type="submit" />
            </form>
        </div>
    )
}
