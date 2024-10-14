import React from 'react';
import ImageCard from './ImageCard';

const ClusterView = ({ groupedImages }) => {
    return (
        <div className="p-4">
            {Object.keys(groupedImages).length === 0 ? (
                <p className="text-center text-gray-500">No images found for this category.</p>
            ) : (
                Object.keys(groupedImages).map((category) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 capitalize text-gray-800 border-b-2 border-gray-300 pb-2">
                            {category} Category
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {groupedImages[category].map((image, index) => (
                                <ImageCard
                                    key={index}
                                    image={image}
                                    className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                                />
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ClusterView;
