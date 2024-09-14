import mongoose from 'mongoose';


// Define a schema for storing the data
const dataSchema = new mongoose.Schema({
    image: String, 
    dateTime: String,
    text: String,
  });
  
  export default mongoose.model('Data', dataSchema);