import React, { useState } from 'react';
import { Form, Input, Button, message, Upload, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'antd/dist/reset.css'; 
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [fileList, setFileList] = useState([]);
  const [dateTime, setDateTime] = useState(null);

  // Form submit handler
  const onFinish = (values) => {
    const formData = new FormData();
    
    // Append the file, accessing the actual file object
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj; // Access the file
      formData.append('image', file);
    } else {
      console.error('No file selected!');
    }

    // Append date and time
    if (dateTime) {
      formData.append('dateTime', dateTime);
    }

    // Append other fields
    formData.append('text', values.text);

    // Log formData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Sending a POST request using axios
    axios.post('/api/message', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        message.success('Data sent successfully!');
      })
      .catch(error => {
        console.error('Error sending data:', error);
        message.error('Error sending data.');
      });
  };

  // Upload file change handler
  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    // Limit to a single file
    newFileList = newFileList.slice(-1);
    setFileList(newFileList);
  };

  // Date and Time change handler
  const handleDateTimeChange = (date, dateString) => {
    setDateTime(dateString);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 10 }}>
      <h2>Home page</h2>
   
    </div>
  );
};

export default Home;
