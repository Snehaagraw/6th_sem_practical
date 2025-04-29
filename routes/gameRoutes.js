const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Middleware: ensure logged-in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// INDEX - Show all games
router.get('/', async (req, res) => {
  const games = await Game.find({});
  res.render('games/index', { games });
});

// NEW - Show form to create new game
router.get('/new', isLoggedIn, (req, res) => {
  res.render('games/new');
});

// CREATE - Add new game
router.post('/', isLoggedIn, async (req, res) => {
  await Game.create(req.body);
  res.redirect('/games');
});

// SHOW - Show details of one game
router.get('/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.render('games/show', { game });
});

// EDIT - Show form to edit game
router.get('/:id/edit', isLoggedIn, async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.render('games/edit', { game });
});

// UPDATE - Handle edit form (except gameName)
router.put('/:id', isLoggedIn, async (req, res) => {
  const { numberOfPlayer, gameDuration, platform } = req.body;
  await Game.findByIdAndUpdate(req.params.id, { numberOfPlayer, gameDuration, platform });
  res.redirect(`/games/${req.params.id}`);
});

// DELETE
router.delete('/:id', isLoggedIn, async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.redirect('/games');
});

module.exports = router;
