const competitorService = require('../services/competitorService');

exports.getCompetitors = async (req, res) => {
    const { idea } = req.query;
    try {
        const list = await competitorService.findCompetitors(idea);
        res.status(200).json({ success: true, competitors: list });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};