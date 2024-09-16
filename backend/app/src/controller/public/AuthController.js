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
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sign up successful
 *       '400':
 *         description: Sign up failed
 */
router.post('/signup', asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const result = await AuthService.signup({ email, password, firstName, lastName });
  if (result.success) {
    await AuthService.sendVerificationEmail(email);
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
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       '401':
 *         description: Login failed
 *       '500':
 *         description: Internal server error
 */
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await AuthService.login({ email, password });
  if (result.success) {
    res.status(200).json({ token: result.token, refreshToken: result.refreshToken });
  } else {
    res.status(401).json(result.message);
  }
}));

/**
 * @openapi
 * /public/auth/verify-email:
 *   post:
 *     summary: Verify email
 *     description: Verify email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Email verified
 *       '401':
 *         description: Verify email failed
 *       '500':
 *         description: Internal server error
 */
router.post('/verify-email', asyncHandler(async (req, res) => {
  const { token } = req.body;

  const result = await AuthService.verifyEmail(token);
  if (result.success) {
    res.status(200).json(result.message);
  } else {
    res.status(401).json(result.message);
  }
}));

/**
 * @openapi
 * /public/auth/change-password:
 *   post:
 *     summary: Change password
 *     description: Change password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed
 *       '401':
 *         description: Change password failed
 *       '500':
 *         description: Internal server error
 */
router.post('/change-password', asyncHandler(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const result = await AuthService.changePassword({ email, oldPassword, newPassword });
  if (result.success) {
    res.status(200).json(result.message);
  } else {
    res.status(401).json(result.message);
  }
}));

/**
 * @openapi
 * /public/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset
 *       '401':
 *         description: Reset password failed
 *       '500':
 *         description: Internal server error
 */
router.post('/reset-password', asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const result = await AuthService.resetPassword({ token, newPassword });
  if (result.success) {
    res.status(200).json(result.message);
  } else {
    res.status(401).json(result.message);
  }
}));

/**
 * @openapi
 * /public/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reset password email sent
 *       '401':
 *         description: Reset password email failed
 *       '500':
 *         description: Internal server error
 */
router.post('/forgot-password', asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await AuthService.sendResetPasswordEmail(email);
  if (result.success) {
    res.status(200).json(result.message);
  } else {
    res.status(401).json(result.message);
  }
}));

/**
 * @openapi
 * /public/auth/google/login:
 *   get:
 *     summary: Google login
 *     description: Google login
 *     responses:
 *       '200':
 *         description: Redirect to Google login page
 */
router.get('/google/login', asyncHandler(async (req, res) => {
  res.redirect(AuthService.getGoogleAuthUrl());
}));

/**
 * @openapi
 * /public/auth/google/token:
 *   post:
 *     summary: Google token
 *     description: Google token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Google login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       '401':
 *         description: Google login failed
 */
router.post('/google/token', asyncHandler(async (req, res) => {
  const { code } = req.body;
  const result = await AuthService.googleLogin(code);
  if (result.success) {
    res.status(200).json({ token: result.token, refreshToken: result.refreshToken });
  } else {
    res.status(401).json(result.message);
  }
}));

/**
 * @openapi
 * /public/auth/refresh-token:
 *   post:
 *     summary: Refresh token
 *     description: Refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Refresh token failed
 */
router.post('/refresh-token', asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await AuthService.refreshAccessToken(refreshToken);
  if (result.success) {
    res.status(200).json({ token: result.token });
  } else {
    res.status(401).json(result.message);
  }
}));

export default router;
