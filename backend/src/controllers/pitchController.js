const pitchService = require('../services/pitchService');

exports.generatePitch = async (req, res) => {
    const { idea } = req.body;
    if (!idea) return res.status(400).json({ error: "Context (idea) is required" });

    try {
        const pitchContent = await pitchService.generatePitchContent(idea);
        res.status(200).json({
            success: true,
            slides: pitchContent.slides
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Pitch generation failed" });
    }
};

exports.exportPitch = async (req, res) => {
    // This will eventually call DigitalOcean Spaces to save a PDF
    res.status(200).json({ message: "Export logic ready. Pending DO Spaces config." });
};