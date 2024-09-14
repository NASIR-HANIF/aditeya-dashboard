import mongoose from 'mongoose';

// Define a schema for storing the data
const dataSchema = new mongoose.Schema({
  image: String, 
  dateTime: String,
  text: String,
  url: {
    type: String,
    required: true, // Make URL required if necessary
  },
  description: {
    type: String,
    required: true, // Make description required if necessary
  },
});

export default mongoose.model('Data', dataSchema);
