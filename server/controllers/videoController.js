const prisma = require('../prisma/client');

const getVideos = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let where = {};
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }
    const videos = await prisma.video.findMany({ where, include: { category: true } });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeaturedVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany({ where: { isFeatured: true }, include: { category: true } });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const { youtubeId, title, description, thumbnailUrl, categoryId, isFeatured, releaseDate } = req.body;
    const video = await prisma.video.create({
      data: { youtubeId, title, description, thumbnailUrl, categoryId: parseInt(categoryId), isFeatured, releaseDate: new Date(releaseDate || Date.now()) }
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.categoryId) data.categoryId = parseInt(data.categoryId);
    if (data.releaseDate) data.releaseDate = new Date(data.releaseDate);
    const video = await prisma.video.update({ where: { id: parseInt(id) }, data });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.video.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Video removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVideos, getFeaturedVideos, createVideo, updateVideo, deleteVideo };
