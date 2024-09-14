import DataModel from "../models/DataModel.js";

// Controller for GET request - Fetch the single record from database
export const getDataController = async (req, res) => {
  try {
    const data = await DataModel.findOne(); // Fetch the single record

    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Send the data along with image, URL, and description in response
    res.status(200).json({
      message: 'Data fetched successfully!',
      data: {
        text: data.text,
        dateTime: data.dateTime,
        image: data.image, 
        url: data.url, 
        description: data.description, 
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data.' });
  }
};


// Controller for POST request - Update or insert new data
export const postDataController = async (req, res) => {
  try {
    const { dateTime, text, url, description } = req.body; // Extract URL and Description from the request body
    const image = req.file ? req.file.buffer.toString('base64') : null;

    // Update the data if it exists, or create new data if it doesn't
    const updatedData = await DataModel.findOneAndUpdate(
      {}, // No filter needed since only one record will exist
      { image, dateTime, text, url, description }, // Fields to update
      { new: true, upsert: true } // Create new if not found (upsert)
    );

    res.status(200).json({ message: 'Data updated/created successfully!', data: updatedData });
  } catch (error) {
    console.error('Error updating/creating data:', error);
    res.status(500).json({ message: 'Error updating/creating data.' });
  }
};


