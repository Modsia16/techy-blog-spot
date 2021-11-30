const sequilize = require('../config/connection');
const seedUser = require('./seedUser');
const seedBlogposts = require('./seedBlogposts');



const seedDatabase = async() => {
    await sequilize.sync({ force: true });
    
    await seedUser();
    await seedBlogposts();
    
    process.exit(0);
    };

seedDatabase();
