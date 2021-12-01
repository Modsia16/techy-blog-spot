const sequilize = require('../config/connection');
const { User, Blogpost } = require('../models');
const seedUser = require('./seedUser');
const seedBlogposts = require('./seedBlogposts');



const seedDatabase = async () => {
    await sequilize.sync({ force: true });
   
const users = await User.bulkCreate(seedUser, { 
    individualHooks: true,
    returning: true,
});
for (const post of seedBlogposts) {
    await Blogpost.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
    });
}
    
    process.exit(0);
    };

seedDatabase();
