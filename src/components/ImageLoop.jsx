import React, { useState, useEffect } from "react";

function ImageLoop({imageUrls, speed}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex === imageUrls.length - 1) ? 0 : prevIndex + 1
            );
        }, speed)
        return () => clearInterval(interval);
    }, [imageUrls])

    return (
        <div>
            <img className="earth" src={imageUrls[currentImageIndex]}
            alt={`Earth from angle #${currentImageIndex}`}
            />
        </div>
    )
}

export default ImageLoop;