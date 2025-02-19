import express from 'express';
import Video from '../models/Video.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming you have an auth middleware

const router = express.Router();

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().populate('user', 'name');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('user', 'name');
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new video (protected route)
router.post('/', protect, async (req, res) => {
  const { title, description, url, thumbnail } = req.body;
  try {
    const video = new Video({
      title,
      description,
      url,
      thumbnail,
      user: req.user._id,
    });
    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;