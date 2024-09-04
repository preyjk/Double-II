import express from 'express';
import asyncHandler from '../asyncHandler.js';
import { v4 as uuidv4 } from 'uuid';
import {ChatBotForRegisteredUsers, ChatBotForUnregisteredUsers} from "../../service/ChatbotService.js";

const router = express.Router();

function getCurrentDateTime() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

/**
 * @openapi
 * /public/chatbot:
 *   post:
 *     summary: Chatbot
 *     description: Chatbot
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: false
 *         description: The access token
 *       - in: header
 *         name: x-chatbot-session
 *         schema:
 *           type: string
 *         required: false
 *         description: The chatbot session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Chatbot response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                 response:
 *                   type: string
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/', asyncHandler(async (req, res) => {
    if (!req.body.prompt ) {
        res.status(400).json();
    }
    const accessToken = req.headers['x-access-token'];
    const ChatBotService = accessToken ? ChatBotForRegisteredUsers : ChatBotForUnregisteredUsers;
    let sessionId = req.headers['x-chatbot-session'];
    let prompt = req.body.prompt;
    if (!sessionId) {
        sessionId = uuidv4();
        const currentDateTime = getCurrentDateTime();
        if (accessToken) {
            prompt = `The x_access_token is '${accessToken}'. ${prompt}`;
        }
        prompt = `Current time is ${currentDateTime}. ${prompt}`;
    }
    const result = await ChatBotService.send({ sessionId, prompt });
    res.status(200).json(result);
}));

export default router;