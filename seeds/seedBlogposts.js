const { Blogpost } = require('../models');

const postBlogpost = [{
  'title': 'Vegitarian tech',
  'content': 'more fiber for tech bloggers, science',
  'user_id': 1,
},
{
  'title': 'Tech toast',
  'content': 'more baked toast for coders',
  'user_id': 2,
},
{
  'title': 'Dont have a cow',
  'content': 'go for a walk when things arent working',
  'user_id': 3,
},
{
  'title': 'Tech isnt doughnuts',
  'content': 'You need to keep practicing tech isnt as easy as eating a doughnut',
  'user_id': 4,
},
{
  'title': 'Tech of shoes',
  'content': 'Tech for shoe la la',
  'user_id': 5,
},
]

const seedBlogpost = async () => Blogpost.bulkCreate(postBlogpost);

module.exports = seedBlogpost;