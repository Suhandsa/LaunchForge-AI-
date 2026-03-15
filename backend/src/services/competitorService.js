const aiService = require('./aiService');

class CompetitorService {
    async findCompetitors(idea) {
        const prompt = `Act as a Market Researcher. Find 3-5 real-world or hypothetical competitors for: "${idea}".
        Return ONLY a JSON array of objects with: name, strength, weakness, and estimated pricing. Do not include markdown or conversational text.`;
        
        try {
            const response = await aiService.askGemini(prompt);
            
            // Extract JSON array in case of markdown wrapping
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (!jsonMatch) throw new Error("No JSON array found");
            
            return JSON.parse(jsonMatch[0]);
        } catch (error) {
            console.error("Competitor Service Error:", error);
            return []; // Return empty array as fallback
        }
    }
}

module.exports = new CompetitorService();