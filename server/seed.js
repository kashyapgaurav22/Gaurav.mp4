const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Clean up existing data
    await prisma.video.deleteMany({});
    await prisma.category.deleteMany({});
    
    // Create Categories
    const cat1 = await prisma.category.create({ data: { name: 'Trending Travel Vlogs' } });
    const cat2 = await prisma.category.create({ data: { name: 'Adventures in Asia' } });
    const cat3 = await prisma.category.create({ data: { name: 'European Getaways' } });

    // Dummy Videos
    const videos = [
      {
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Exploring the Streets of Tokyo',
        description: 'Join me as we walk through the neon-lit streets of Tokyo, experiencing the culture, food, and amazing nightlife. This is a journey you will not forget.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        categoryId: cat2.id,
        isFeatured: true
      },
      {
        youtubeId: 'jNQXAC9IVRw',
        title: 'Backpacking across Switzerland',
        description: 'The Alps are calling. A beautiful train ride and a long hike through the picturesque mountains of Switzerland.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
        categoryId: cat3.id,
        isFeatured: false
      },
      {
        youtubeId: 'tO01J-M3g0U',
        title: 'Street Food in Bangkok',
        description: 'Trying out the spiciest and most delicious street food in Bangkok, Thailand.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        categoryId: cat2.id,
        isFeatured: false
      },
      {
        youtubeId: '2g811Eo7K8U',
        title: 'Paris: The City of Lights',
        description: 'A romantic evening walking around the Eiffel tower and enjoying French cuisine.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1502602898657-3e907611a509?auto=format&fit=crop&w=800&q=80',
        categoryId: cat3.id,
        isFeatured: false
      },
      {
        youtubeId: 'eI4an8aSsgw',
        title: 'Hidden Gems of Bali',
        description: 'Exploring the untouched beaches and deep jungles of Bali, Indonesia.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        categoryId: cat1.id,
        isFeatured: false
      },
      {
        youtubeId: '9bZkp7q19f0',
        title: 'Road Trip through Italy',
        description: 'Driving through the Amalfi coast and stopping by historic sites in Rome.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516483638261-f40af5ebbd39?auto=format&fit=crop&w=800&q=80',
        categoryId: cat3.id,
        isFeatured: false
      },
      {
        youtubeId: 'kJQP7kiw5Fk',
        title: 'Desert Safari in Dubai',
        description: 'Dune bashing and camel riding in the vast deserts of the UAE.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        categoryId: cat1.id,
        isFeatured: false
      }
    ];

    for (let v of videos) {
      await prisma.video.create({ data: v });
    }

    console.log('Database seeded with dummy data!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
seed();
