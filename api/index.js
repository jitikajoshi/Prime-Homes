import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
// import { firebaseapp } from "../client/src/firebase.js" ;
dotenv.config();
const password="36u4LPUvVMAAyC8A"

///  Firbase call

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "the-zameendarz-a798d.firebaseapp.com",
//   projectId: "the-zameendarz-a798d",
//   storageBucket: "the-zameendarz-a798d.appspot.com",
//   messagingSenderId: "601941701145",
//   appId: "1:601941701145:web:b0e10ecfee72ecf3a0b088"
// };

// initializeApp(firebaseConfig);

// firebaseapp();








// const firebase = require("../client/src/firebase.js");

// firebase();
mongoose
  .connect(`mongodb+srv://avanishukla2002:${password}@real-estate-website.oagnp5s.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
