import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to format time
const formatTime = (dateTimeStr) => {
  if (!dateTimeStr) return 'No date available';

  const date = new Date(dateTimeStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}-${formattedMinutes} ${ampm}`;
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
        <p>{formatTime(data?.dateTime)}</p>
      </div>
    </div>
  );
};

export default Contact;
