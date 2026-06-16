const express = require('express');
const router = express.Router();
const { getVideos, getFeaturedVideos, createVideo, updateVideo, deleteVideo } = require('../controllers/videoController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getVideos);
router.get('/featured', getFeaturedVideos);
router.post('/', protect, admin, createVideo);
router.put('/:id', protect, admin, updateVideo);
router.delete('/:id', protect, admin, deleteVideo);

module.exports = router;
