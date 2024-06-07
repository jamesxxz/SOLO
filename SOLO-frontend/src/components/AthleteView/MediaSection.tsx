import React from 'react';
import './AthleteView.css'; // Ensure the CSS is included

interface MediaItem {
  media_id: string;
  type: string;
  id: string;
  name: string;
  signedUrl: string;
}

interface MediaSectionProps {
  title: string;
  mediaItems: MediaItem[];
  onViewMore: () => void;
  onDelete: (media_id: string) => void;
}

const MediaSection: React.FC<MediaSectionProps> = ({ title, mediaItems, onViewMore, onDelete }) => {
  return (
    <div className="media-section">
      <h2 className="section-title">{title}</h2>
      <div className="media-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {mediaItems.map(item => (
          <div key={item.id} data-id={item.id} className="media-item">
            <img src={item.signedUrl} alt={item.name} className="media-image" />
            <div className="media-details">
              <span style={{ color: 'black' }}>{item.name}</span>
              <button
                className="delete-button"
                onClick={() => {
                  console.log('Delete button clicked for ID:', item.media_id); // Add this log
                  onDelete(item.media_id);
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSection;


// cannot display thumbnails for videos