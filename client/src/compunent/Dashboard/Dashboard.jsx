import React, { useState } from 'react';
import { Form, Input, Button, message, Upload, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'antd/dist/reset.css'; 
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
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
      <h2>Submit Your Data</h2>
      <Form layout="vertical" onFinish={onFinish}>
        {/* Image Upload */}
        <Form.Item
          label="Upload Image"
          name="image"
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload
            beforeUpload={() => false} // Prevent automatic upload
            fileList={fileList}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Date and Time Picker */}
        <Form.Item
          label="Date and Time"
          name="dateTime"
          rules={[{ required: true, message: 'Please select date and time!' }]}
        >
          <DatePicker
            showTime
            onChange={handleDateTimeChange}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>

        {/* Text Input */}
        <Form.Item
          label="Text"
          name="text"
          rules={[{ required: true, message: 'Please enter text!' }]}
        >
          <Input placeholder="Enter your text" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Dashboard;
