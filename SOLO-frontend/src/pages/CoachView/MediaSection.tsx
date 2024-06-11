import React from 'react';
import '../../components/AthleteView/AthleteView.css'; // Ensure the CSS is included
import { IonCard, IonCardContent, IonButton } from '@ionic/react';

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
  onDownload: (signedUrl: string) => void;
}

const MediaSection: React.FC<MediaSectionProps> = ({ title, mediaItems, onViewMore, onDownload }) => {
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
                className="download-button"
                style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                onClick={() => {
                  console.log('Download button clicked for URL:', item.signedUrl); // Add this log
                  onDownload(item.signedUrl);
                }}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSection;
