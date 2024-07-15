import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import { authMiddleware } from './middleware/auth.js';
import { connectDB } from './config/db.js';
dotenv.config();

// database connection initiate
connectDB();

const app=express()
app.use(bodyParser.json());

//routes
app.use('/document-management/auth',authRoutes);
app.use('/document-management/documents',documentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));