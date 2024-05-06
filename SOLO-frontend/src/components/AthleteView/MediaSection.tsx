// media boxes

import React from 'react';
import './AthleteView.css'; // Ensure the CSS is included

interface MediaItem {
  id: string;
  name: string;
  imageUrl: string;
}

interface MediaSectionProps {
  title: string;
  mediaItems: MediaItem[];
  onViewMore: () => void;  // Function to handle View More action
}

const MediaSection: React.FC<MediaSectionProps> = ({ title, mediaItems, onViewMore }) => {
  return (
    <div>
      <h2 className="section-title">{title}</h2>
      {mediaItems.map(item => (
        <div key={item.id} className="media-item">
          <img src={item.imageUrl} alt={item.name} className="media-image" />
          <div className="media-details">
            <span>{item.name}</span>
            <button className="delete-button">🗑️</button>
          </div>
        </div>
      ))}
      <button onClick={onViewMore} className="view-more-button">View More</button>
    </div>
  );
};

export default MediaSection;
