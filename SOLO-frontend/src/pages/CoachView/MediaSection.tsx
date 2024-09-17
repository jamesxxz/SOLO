import React from 'react';
import '../../components/AthleteView/AthleteView.css'; // Ensure the CSS is included
import { IonButton } from '@ionic/react';

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
}

const MediaSection: React.FC<MediaSectionProps> = ({ title, mediaItems, onViewMore }) => {
  // Function to handle file download
  const handleDownload = (signedUrl: string) => {
    // Creating an anchor element dynamically
    const link = document.createElement('a');
    link.href = signedUrl;
    link.download = ''; // Optionally, set a filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                  console.log('Download button clicked for URL:', item.signedUrl); // Debug log
                  handleDownload(item.signedUrl);
                }}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
      <IonButton onClick={onViewMore}>View More</IonButton>
    </div>
  );
};

export default MediaSection;
