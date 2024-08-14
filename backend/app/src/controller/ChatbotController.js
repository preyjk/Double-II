import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import ChatBotService from "../service/ChatbotService.js";

const router = express.Router();

router.post('/chatbot', async (req, res) => {
    try {
        const sessionId = req.headers['x-chatbot-session'] || uuidv4();
        const { prompt } = req.body;
        const result = await ChatBotService.send({sessionId, prompt});
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

export default router;