import React from 'react';
import './ImageGallery.css';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        { id: 1, src: 'image1.jpg', isFeature: false },
        { id: 2, src: 'image2.jpg', isFeature: true },
        { id: 3, src: 'image3.jpg', isFeature: false },
      ],
      selectedImages: [],
      isDragging: false,
    };
  }

  handleDragStart = (e, id) => {
    e.dataTransfer.setData('imageId', id);
    this.setState({ isDragging: true });
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDrop = (e, id) => {
    e.preventDefault();
    const draggedImageId = e.dataTransfer.getData('imageId');
    const updatedImages = [...this.state.images];
    const draggedImage = updatedImages.find((img) => img.id === +draggedImageId);
    const dropImage = updatedImages.find((img) => img.id === id);
  
    if (draggedImage && dropImage) {
      const draggedIndex = updatedImages.indexOf(draggedImage);
      const dropIndex = updatedImages.indexOf(dropImage);
  
      updatedImages[draggedIndex] = dropImage;
      updatedImages[dropIndex] = draggedImage;
  
      this.setState({ images: updatedImages, isDragging: false });
    }
  };
  
  handleImageSelect = (id) => {
    const { selectedImages } = this.state;
    if (selectedImages.includes(id)) {
      this.setState({ selectedImages: selectedImages.filter((imageId) => imageId !== id) });
    } else {
      this.setState({ selectedImages: [...selectedImages, id] });
    }
  };

  handleSetFeatureImage = () => {
    const { images, selectedImages } = this.state;
    const featureImage = images.find((img) => img.isFeature);
    if (featureImage) {
      featureImage.isFeature = false;
    }
    const selectedImage = images.find((img) => img.id === selectedImages[0]);
    if (selectedImage) {
      selectedImage.isFeature = true;
    }
    this.setState({ images });
  };

  render() {
    const { images, selectedImages, isDragging } = this.state;

    return (
      <div className="image-gallery">
        {images.map((image) => (
          <div
            key={image.id}
            className={`image-container ${image.isFeature ? 'feature-image' : ''}`}
            draggable
            onDragStart={(e) => this.handleDragStart(e, image.id)}
            onDragOver={this.handleDragOver}
            onDrop={(e) => this.handleDrop(e, image.id)}
            onClick={() => this.handleImageSelect(image.id)}
          >
            <img src={image.src} alt={`Image ${image.id}`} />
            {selectedImages.includes(image.id) && <div className="selected-indicator">Selected</div>}
          </div>
        ))}
        <button className="feature-button" onClick={this.handleSetFeatureImage}>
          Set Feature Image
        </button>
        {isDragging && <div className="dragging-indicator">Dragging...</div>}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ImageGallery />
    </div>
  );
}

export default App;
