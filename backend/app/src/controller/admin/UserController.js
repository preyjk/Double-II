import express from 'express';
import asyncHandler from '../asyncHandler.js';
import UserService from '../../service/UserService.js';
import AuthService from '../../service/AuthService.js';

const router = express.Router();

/**
 * @openapi
 * /admin/users:
 *   post:
 *     summary: Sign up a new user
 *     description: Sign up a new user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username
 *               password:
 *                 type: string
 *                 description: password
 *               roles:
 *                 type: array
 *                 description: roles
 *                 items:
 *                   type: string  
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       400:
 *         description: Bad request
 */
router.post('/', asyncHandler(async (req, res) => {
    const result = await AuthService.signup(req.body);
    if (result.success) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).json(result.message);
    }
}));

/**
 * @openapi
 * /admin/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:userId', asyncHandler(async (req, res) => {
    const result = await UserService.deleteUser(req.params.userId);
    return res.status(204).json(result.message);
}));

export default router;