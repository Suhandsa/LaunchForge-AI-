const aiService = require('../services/aiService');

exports.handleChat = async (req, res) => {
    const { message, idea_id } = req.body;
    try {
        const chatPrompt = `As an AI Co-founder, answer this user query: "${message}" in the context of their current startup idea.`;
        const reply = await aiService.callDigitalOceanAI(chatPrompt);
        res.status(200).json({ success: true, reply });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};