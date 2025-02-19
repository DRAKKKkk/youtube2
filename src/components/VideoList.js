import React, { useEffect, useState } from 'react';
import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend.vercel.app';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API_URL}/api/videos`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched videos:', data); // Log the fetched data
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError(error.message);
      }
    };

    fetchVideos();
  }, [API_URL]);

  return (
    <main>
      <section className="videos">
        <h2>Recommended</h2>
        <div className="video-grid">
          {error ? (
            <p>Error fetching videos: {error}</p>
          ) : videos.length > 0 ? (
            videos.map((video) => (
              <div className="video-card" key={video._id}>
                <iframe
                  width="250"
                  height="140"
                  src={video.url.replace('watch?v=', 'embed/')}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>{video.title}</p>
                <p>{video.description}</p>
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default VideoList;
