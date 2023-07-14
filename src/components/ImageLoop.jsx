import React, { useState, useEffect } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


function ImageLoop({imageUrls}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [speed, setSpeed] = useState(300);
    const [playing , setPlaying] = useState(true);
    useEffect(() => {
        if (playing) {
            const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex === imageUrls.length - 1) ? 0 : prevIndex + 1
            );
            }, speed)
            return () => clearInterval(interval);
        }
    }, [playing,speed,imageUrls])

    return (
        <div className="ImageContainer">
            <h2>Rotation Speed: {(2100 - speed)/100}</h2>
            <div className="EarthContainer">
                <img className="earth" src={imageUrls[currentImageIndex]}
                alt={`Earth from angle #${currentImageIndex}`}
                />
                <Slider dots={true} vertical={false} reverse={true} min={0} max={2000} step={100} value={speed} onChange={newSpeed => setSpeed(newSpeed)}/>
            </div>
            <button onClick={() => setPlaying(!playing) && setSpeed(speed > 100? speed - 100 : speed)} style={{fontSize: 58}}>
                {playing ? "| |" : ">"  }
            </button>
            
        </div>
    )
}

export default ImageLoop;