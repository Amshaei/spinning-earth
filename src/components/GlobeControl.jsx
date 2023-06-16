import React from "react";
import { useState, useEffect } from "react";
import ImageLoop from "./ImageLoop";

function GlobeControl(props) {

    const key = process.env.REACT_APP_NASA_API_KEY;
    const urlDate = process.env.REACT_APP_NASA_API_URL_DATE;
    const urlImages = process.env.REACT_APP_NASA_API_URL_IMAGE;
    const urlArchive = process.env.REACT_APP_NASA_API_URL_ARCHIVE;
        
    const [latestImageDate, setLatestImageDate] = useState('');
    const [imageNames, setImageNames] = useState([]);
    const [fetchedImages, setFetchedImages] = useState([]);
    const [todayAlt, setTodayAlt] = useState("");
    let today = "";

    const [rotationSpeed, setRotationSpeed] = useState(1000);

    useEffect(() => {
        // Find Date
        const fetchLatestImageDate = async () => {
            try{
                const response = await fetch(
                    `${urlDate}?api_key=${key}`
                )
                if (response.ok) {
                    const imageInfo = await response.json();
                    const latestImageDate = imageInfo[0].date;
                    setLatestImageDate(latestImageDate)
                } else {
                    console.log('Failed to retrieve image information.');
                }
            } catch (error) {
                console.log('Error occurred while fetching image information:', error);
            }
        };
        fetchLatestImageDate();
    }, []);

    useEffect(() => {
        if ((/\d{4}-\d{2}-\d{2}/).test(latestImageDate)) {
            let date = latestImageDate.replaceAll('-', '');
            let year = date.substring(0,4);
            let month = date.substring(4,6); 
            let day = date.substring(6,8);
            today = `${year}-${month}-${day}`;
            setTodayAlt(`${year}/${month}/${day}/png/`);


            // Fetch Image Names
            const fetchImageNames = async () => {
                try{
                    const response = await fetch(
                        `${urlImages}${today}?api_key=${key}`
                    )
                    if (response.ok) {
                        const imageInfo = await response.json();
                        console.log(imageInfo);
                        const responseNames = imageInfo.map(obj => obj.image); 
                        setImageNames(responseNames);
                    } else {
                        console.log('Failed to retrieve image information.');
                    }
                } catch (error) {
                    console.log('Error occurred while fetching image information:', error);
                }
            };
            fetchImageNames();
        }
    }, [latestImageDate])

    useEffect(() => {
        setFetchedImages(imageNames.map((imageName, index) => {
            return `${urlArchive}${todayAlt}${imageName}.png?api_key=${key}`
        }))
        console.log(imageNames);
    }, [latestImageDate, imageNames])
    
    
    
    return (
        <div className="row flex justify">
            
            <h1 style={{fontSize: 58, color: 'white'}}>{latestImageDate}</h1>
            
            <ImageLoop imageUrls={fetchedImages} speed={rotationSpeed}/>
            <div className="flex">
                <button onClick={() => setRotationSpeed(rotationSpeed < 2000? rotationSpeed-100 : rotationSpeed)} style={{fontSize: 58}}>-</button>
                <button onClick={() => setRotationSpeed(rotationSpeed > 100? rotationSpeed+100 : rotationSpeed)} style={{fontSize: 58}}>+</button>
            </div>
        </div>
    );
}

export default GlobeControl;