import express from 'express';
import asyncHandler from './asyncHandler.js';
import UserService from '../service/UserService.js';
import AuthService from '../service/AuthService.js';

const router = express.Router();

router.post('/users', AuthService.hasRole(['admin']), asyncHandler(async (req, res) => {
    const result = await AuthService.signup(req.body);
    if (result.success) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).json(result.message);
    }
}));

router.delete('/users/:username', AuthService.hasRole(['admin']), asyncHandler(async (req, res) => {
    const result = await UserService.deleteUser(req.params.username);
    return res.status(204).json(result.message);
}));

export default router;