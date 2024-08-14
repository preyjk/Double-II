import express from 'express';
import asyncHandler from './asyncHandler.js';
import AuthService from '../service/AuthService.js';

const router = express.Router();

router.post('/signup', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = await AuthService.signup({ username, password });
  if (result.success) {
    res.status(200).json(result.message);
  } else {
    res.status(400).json(result.message);
  }
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = await AuthService.login({ username, password });
  if (result.success) {
    res.status(200).json({ token: result.token });
  } else {
    res.status(401).json(result.message);
  }
}));

export default router;
