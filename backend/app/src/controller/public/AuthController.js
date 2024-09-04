import express from 'express';
import asyncHandler from '../asyncHandler.js';
import AuthService from '../../service/AuthService.js';

const router = express.Router();

/**
 * @openapi
 * /public/auth/signup:
 *   post:
 *     summary: Sign up
 *     description: Sign up
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sign up successful
 *       '400':
 *         description: Sign up failed
 */
router.post('/signup', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = await AuthService.signup({ username, password });
  if (result.success) {
    res.status(200).json(result.message);
  } else {
    res.status(400).json(result.message);
  }
}));

/**
 * @openapi
 * /public/auth/login:
 *   post:
 *     summary: Login
 *     description: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Login failed
 *       '500':
 *         description: Internal server error
 */
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
