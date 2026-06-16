const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const run = async () => {
  const newImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
  await prisma.video.updateMany({
    where: { isFeatured: true },
    data: { thumbnailUrl: newImage }
  });
  console.log('Banner updated');
};
run();
