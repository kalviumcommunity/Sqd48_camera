const express = require('express');
const router = express.Router();

let users = [];

// Read (GET) all users
router.get('/users', (req, res) => {
  res.send(users);
});

// Read (GET) a single user by ID
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Create (POST) a new user
router.post('/Createusers', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required fields' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update (PUT) an existing user
router.put('/Updateusers/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required fields' });
  }
  users[userIndex].name = name;
  users[userIndex].email = email;
  res.json(users[userIndex]);
});

// Delete (DELETE) a user by ID
router.delete('/Deleteusers/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
});

module.exports = router;