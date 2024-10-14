import React from 'react';

const ImageCard = ({ image }) => {
    return (
        <div className="border rounded-md overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="overflow-hidden">
                <img
                    src={image.urls.small}
                    alt={`Image ${image.id}`}
                    className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110"
                />
            </div>
        </div>
    );
};

export default ImageCard;
