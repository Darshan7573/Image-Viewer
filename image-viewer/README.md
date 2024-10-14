# Image Grid Viewer

This project is an Image Grid Viewer built with React, Tailwind CSS, and Infinite Scroll. Users can browse through different categories of images, with the option to filter images by category or switch between different view modes (File View and Cluster View).

## Features

- **File View**: Displays a list of images in a grid format with infinite scrolling.
- **Cluster View**: Groups images by category and displays them in a modern grid format.
- **Hover Effects**: Each image has a zoom-in hover effect for a more interactive user experience.
- **Responsive Design**: The app is fully responsive, adapting to different screen sizes.
- **Image Filtering**: Users can filter images by category using the search input.

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the components and creating responsive designs.
- **React Infinite Scroll Component**: For implementing infinite scroll functionality.
- **Axios**: For making API requests to fetch images.
- **Unsplash API**: The app uses the Unsplash API to fetch high-quality images.

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd image-grid-viewer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

## API Configuration

To fetch images from Unsplash, you'll need an API key. Get your API key from [Unsplash](https://unsplash.com/developers) and replace it in the `App.js` file:

```js
headers: {
    Authorization: 'Client-ID YOUR_ACCESS_KEY',
}
```

## License

This project is licensed under the MIT License.
