import express from 'express';
import asyncHandler from './asyncHandler.js';
import { v4 as uuidv4 } from 'uuid';
import ChatBotService from "../service/ChatbotService.js";

const router = express.Router();

router.post('/chatbot', asyncHandler(async (req, res) => {
    const sessionId = req.headers['x-chatbot-session'] || uuidv4();
    const { prompt } = req.body;
    const result = await ChatBotService.send({ sessionId, prompt });
    res.status(200).json(result);
}));

export default router;