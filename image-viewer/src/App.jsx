import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FileView from './components/FileView';
import ClusterView from './Components/ClusterView';
import axios from 'axios';

const categoriesList = [
  'car',
  'person',
  'nature',
  'architecture',
  'animal',
  'fish',
  'bikes',
  'technology',
  'food',
  'sports',
  'fashion',
  'music',
  'travel'
];


const getCategoryById = (id) => {
  return categoriesList[id % categoriesList.length];
};

const App = () => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState('clusterView');
  const [filters, setFilters] = useState('');

  const fetchRandomImages = async () => {
    try {
      const newImages = Array.from({ length: 20 }, (_, index) => ({
        id: Math.floor(Math.random() * 1000),
        urls: { small: `https://picsum.photos/200/300?random=${index}` },
        categories: [getCategoryById(index)],
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
      setHasMore(true);
    } catch (error) {
      console.error('Error fetching random images:', error);
      setHasMore(false);
    }
  };

  const fetchImagesByCategory = async (category) => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: category, per_page: 20 },
        headers: {
          Authorization: 'Client-ID WIQ1qjQenNf7-qCadLuYn53CGYWDWBAzOiorSR7mFm4',
        },
      });
      const newImages = response.data.results.map((image) => ({
        id: image.id,
        urls: image.urls,
        categories: [category],
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error('Error fetching images by category:', error);
      setHasMore(false);
    }
  };

  const loadMoreImages = () => {
    if (viewMode === 'fileView') {
      fetchRandomImages();
    } else if (viewMode === 'clusterView') {
      categoriesList.forEach((category) => fetchImagesByCategory(category));
    }
  };

  useEffect(() => {
    if (viewMode === 'fileView') {
      setImages([]);
      loadMoreImages();
    } else if (viewMode === 'clusterView') {
      setImages([])
      loadMoreImages();
    }
  }, [viewMode]);

  const filteredImages = images.filter((image) => {
    if (filters.trim() === '') return true;
    return image.categories.some((category) =>
      category.toLowerCase() === filters.trim().toLowerCase()
    );
  });

  const groupedImages = filteredImages.reduce((acc, image) => {
    image.categories.forEach((category) => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(image);
    });
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4">
      <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 text-center px-2 py-6 text-white text-4xl font-bold shadow-lg rounded-md mb-6">
        Image Grid Viewer
      </h1>
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setViewMode('fileView')}
          className={`px-6 py-3 text-lg font-semibold transition rounded-full shadow-md ${viewMode === 'fileView' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'} hover:bg-blue-600 hover:text-white focus:outline-none`}
        >
          File View
        </button>
        <button
          onClick={() => setViewMode('clusterView')}
          className={`px-6 py-3 text-lg font-semibold transition rounded-full shadow-md ${viewMode === 'clusterView' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'} hover:bg-blue-600 hover:text-white focus:outline-none`}
        >
          Cluster View
        </button>
      </div>
      {viewMode === "clusterView" && (
        <div className="mb-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Filter by category (e.g., car, person)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setFilters(e.target.value.toLowerCase())}
          />
        </div>
      )}
      {viewMode === 'fileView' ? (
        <InfiniteScroll
          dataLength={images.length}
          next={loadMoreImages}
          hasMore={hasMore}
          loader={<h4 className="text-center mt-6">Loading more images...</h4>}
          endMessage={<p className="text-center text-gray-500 mt-6">No more images to load.</p>}
        >
          <FileView images={filteredImages} />
        </InfiniteScroll>
      ) : (
        <ClusterView groupedImages={groupedImages} />
      )}
    </div>
  );
};

export default App;
