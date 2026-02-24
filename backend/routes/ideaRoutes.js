const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// POST /idea/generate
router.post('/generate', async (req, res) => {
    try {
        const { idea } = req.body;
        if (!idea) return res.status(400).json({ error: "Idea is required" });

        // Call your AI Service
        const plan = await aiService.generateStartupPlan(idea);
        
        // Return results to frontend
        res.status(200).json({
            success: true,
            data: plan
        });
    } catch (error) {
        res.status(500).json({ error: "AI generation failed" });
    }
});

module.exports = router;