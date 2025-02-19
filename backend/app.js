const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middleware/errorHandler');

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://youtube-11u9dhqvw-drakkkkks-projects.vercel.app',
  'https://youtube-et60lzb3l-drakkkkks-projects.vercel.app',
  'https://youtube-alpha-hazel.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use('/api/videos', require('./routes/videos'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;
