import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/routes.js';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.REACT_APP_API_URL
}));

// Middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/', routes);

// Home route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// 404 route for not found errors
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// PORT
const PORT = process.env.PORT || 8080;

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
  });
});
