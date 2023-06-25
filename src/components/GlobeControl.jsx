import React from "react";
import { useState, useEffect, useRef } from "react";
import ImageLoop from "./ImageLoop";

function GlobeControl() {

    const key = process.env.REACT_APP_NASA_API_KEY;
    const urlDate = process.env.REACT_APP_NASA_API_URL_DATE;
    const urlImages = process.env.REACT_APP_NASA_API_URL_IMAGE;
    const urlArchive = process.env.REACT_APP_NASA_API_URL_ARCHIVE;
        
    const [latestImageDate, setLatestImageDate] = useState('');
    const [imageNames, setImageNames] = useState([]);
    const [fetchedImages, setFetchedImages] = useState([]);
    const [todayAlt, setTodayAlt] = useState("");

    const todayRef = useRef("");

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
    }, [key, urlDate]);

    useEffect(() => {
        if ((/\d{4}-\d{2}-\d{2}/).test(latestImageDate)) {
            let date = latestImageDate.replaceAll('-', '');
            let year = date.substring(0,4);
            let month = date.substring(4,6); 
            let day = date.substring(6,8);
            todayRef.current = `${year}-${month}-${day}`;
            setTodayAlt(`${year}/${month}/${day}/png/`);


            // Fetch Image Names
            const fetchImageNames = async () => {
                try{
                    const response = await fetch(
                        `${urlImages}${todayRef.current}?api_key=${key}`
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
    }, [key, urlImages, latestImageDate])

    useEffect(() => {
        setFetchedImages(imageNames.map((imageName, index) => {
            return `${urlArchive}${todayAlt}${imageName}.png?api_key=${key}`
        }))
        console.log(imageNames);
    }, [key, todayAlt, urlArchive, latestImageDate, imageNames])
    
    
    
    return (
        <div className="GlobeComponent row flex justify">
            
            <h1>{latestImageDate}</h1>
            <ImageLoop imageUrls={fetchedImages}/>
        </div>
    );
}

export default GlobeControl;