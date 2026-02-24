const aiService = require('./aiService');

class CompetitorService {
    async findCompetitors(idea) {
        const prompt = `Act as a Market Researcher. Find 3-5 real-world or hypothetical competitors for: "${idea}".
        Return ONLY a JSON array of objects with: name, strength, weakness, and estimated pricing.`;
        
        const response = await aiService.callDigitalOceanAI(prompt);
        return JSON.parse(response);
    }
}

module.exports = new CompetitorService();