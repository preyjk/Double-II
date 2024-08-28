import express from 'express';
import asyncHandler from './asyncHandler.js';
import { v4 as uuidv4 } from 'uuid';
import {ChatBotForRegisteredUsers, ChatBotForUnregisteredUsers} from "../service/ChatbotService.js";

const router = express.Router();

router.post('/chatbot', asyncHandler(async (req, res) => {
    if (!req.body.prompt ) {
        res.status(400).json();
    }
    const sessionId = req.headers['x-chatbot-session'] || uuidv4();
    const accessToken = req.headers['x-access-token'];
    const ChatBotService = accessToken ? ChatBotForRegisteredUsers : ChatBotForUnregisteredUsers;
    const prompt = accessToken? `the x_access_token is '${accessToken}'. ${req.body.prompt}` : req.body.prompt;
    const result = await ChatBotService.send({ sessionId, prompt });
    res.status(200).json(result);
}));

export default router;