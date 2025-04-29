const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Register form
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Register logic
router.post('/register', async (req, res) => {
  try {
    const { username, password, age, phoneNumber, gender, isLegal } = req.body;
    const user = new User({ username, age, phoneNumber, gender, isLegal });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      res.redirect('/games');
    });
  } catch (e) {
    res.redirect('/register');
  }
});

// Login form
router.get('/login', (req, res) => {
  res.render('users/login');
});

// Login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/games',
  failureRedirect: '/login'
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;

