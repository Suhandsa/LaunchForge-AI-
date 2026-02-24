const aiService = require('../services/aiService');

exports.generateIdea = async (req, res) => {
    const { idea } = req.body;
    if (!idea) return res.status(400).json({ error: "Idea text is required" });

    try {
        const plan = await aiService.generateFullPlan(idea);
        res.status(200).json({ success: true, data: plan });
    } catch (error) {
        res.status(500).json({ success: false, message: "Generation failed" });
    }
};

exports.getIdeaById = async (req, res) => {
    // Logic for fetching from memory/mock since DB is skipped for now
    res.status(200).json({ message: "DB logic skipped per request" });
};