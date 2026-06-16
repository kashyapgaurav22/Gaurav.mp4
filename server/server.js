const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/categories', categoryRoutes);

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gaurav.mp4 server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
