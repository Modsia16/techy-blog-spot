const { User } = require('../models');

const userData = [{
  'username': 'Lisa',
  'password': 'mdelallala'
}, 
{
  'username': 'Maggie',
  'password': 'maggydelala'
},
{
  'username': 'Bart',
  'password': 'bartdelala'
},
{
  'username': 'Homer',
  'password': 'homerdelala'
},
{
  'username': 'Michael',
  'password': 'michaeldunder'
}]

const seedUsers = () => User.bulkCreate(userData, {
  indivdualHooks: true,
  returning: true,
});


module.exports = seedUsers;

