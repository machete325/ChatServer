const express = require('express');
const { message } = require('statuses');
const router = express.Router();

const users = [
  {
    id: '1',
    name: 'Yevhenii',
    email: 'yevhenii@gmail.com',
    password: 1234,
    secret_key: '1234dwd35454',
    friends: [2, 3],
  },
  {
    id: '2',
    name: 'Elizabeth',
    email: 'elizabeth@gmail.com',
    password: 123456,
    secret_key: '123435454fefe',
    friends: [1, 3],
  },
  {
    id: '3',
    name: 'Roman',
    email: 'roman@gmail.com',
    password: 12345,
    secret_key: '1dwdwgg23435454',
    friends: [1, 2],
  },
];

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = parseInt(req.body.password);

  const user = users.find((user) => user.email === email);
  if (user) {
    if (user.password === password) {
      res.json({ user });
    } else {
      res.json({ error: 'Password incorrect' });
    }
  } else {
    res.json({ error: 'User does not exist' });
  }
});

router.get('/friends', (req, res) => {
  const email = req.query.email;
  const secret_key = req.query.secret_key;
  const user = users.find((user) => user.email === email);
  if (user) {
    const friends = [];
    user.friends.forEach((el) => {
      friend = users.filter((user) => user.id == el);
      if (friend) {
        friends.push(friend[0]);
      }
    });
    if (friends.length !== 0) {
      res.json({ friends });
    } else {
      res.json({ message: "You don't have a friends (" });
    }
  } else {
    res.json({ error: 'User does not exist' });
  }
});

module.exports = router;
