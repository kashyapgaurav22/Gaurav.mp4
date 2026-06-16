const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const run = async () => {
  const images = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', // Mountains
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80', // Everest
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80', // Snowy peak
    'https://images.unsplash.com/photo-1506905925222-494a3f81e646?w=800&q=80', // Mountain lake
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80', // Starry mountain
    'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=800&q=80', // Green mountain
    'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80'  // Autumn mountain
  ];

  const videos = await prisma.video.findMany();
  for (let i = 0; i < videos.length; i++) {
    await prisma.video.update({
      where: { id: videos[i].id },
      data: { thumbnailUrl: images[i % images.length] }
    });
  }
  console.log('Thumbnails updated to beautiful mountains!');
};
run();
