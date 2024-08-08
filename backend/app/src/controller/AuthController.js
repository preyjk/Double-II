import express from 'express';
import AuthService from '../service/AuthService.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await AuthService.signup({ username, password });
    if (result.success) {
      res.status(200).json(result.message);
    } else {
      res.status(400).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await AuthService.login({ username, password });
    if (result.success) {
      res.status(200).json({ token: result.token });
    } else {
      res.status(401).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

export default router;
