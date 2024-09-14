import mongoose from "mongoose";
import colors from "colors";
import  dotenv  from 'dotenv';
dotenv.config()


const connectDB = async () => {
// MongoDB Atlas connection
 const  DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@myfirstcluster.2zedvpv.mongodb.net/aditya-dashboard`
// const DB_URL = 'mongodb://127.0.0.1:27017/aditya-dashboard'
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;