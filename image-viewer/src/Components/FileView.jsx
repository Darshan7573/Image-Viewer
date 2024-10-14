import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageCard from './ImageCard';

const FileView = ({ images, loadMoreImages, hasMore }) => {
    return (
        <InfiniteScroll
            dataLength={images.length}
            next={loadMoreImages}
            hasMore={hasMore}
            loader={<h4 className="text-center text-gray-500">Loading more images...</h4>}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
        >
            {images.map((image, index) => (
                <ImageCard key={index} image={image} />
            ))}
        </InfiniteScroll>
    );
};

export default FileView;
