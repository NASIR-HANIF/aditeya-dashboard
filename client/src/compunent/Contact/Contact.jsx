import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to format date and time
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return 'No date available';

  const date = new Date(dateTimeStr);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day}/${month}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
};

const Contact = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/message');
        setData(response.data.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const backgroundImage = data?.image 
    ? `url(data:image/jpeg;base64,${data.image})` 
    : 'none';
  const backgroundColor = !data?.image ? '#FFBF00' : 'transparent';

  // Function to open URL in a new tab
  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div
      style={{
        backgroundImage,
        backgroundColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}
      >
        <h1>Contact Page</h1>
        <p>{data?.text || 'No message available'}</p>
        <p>{formatDateTime(data?.dateTime)}</p>

        {/* Show the URL and Open Button */}
        {data?.url && (
          <div>
            <button 
              style={{ marginTop: '10px', padding: '10px', backgroundColor: '#00FF00', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => openInNewTab(data.url)}
            >
              Open URL in New Tab
            </button>
          </div>
        )}

        {/* Show the Description */}
        {data?.description && (
          <div>
            <p>Description: {data.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
