const aiService = require('./aiService');

class PitchService {
    async generatePitchContent(idea) {
        const prompt = aiService.getPromptTemplate('pitch-deck', { idea });
        const content = await aiService.callDigitalOceanAI(prompt);
        return JSON.parse(content);
    }
}

module.exports = new PitchService();