const aiService = require('./aiService');

class PitchService {
    async generatePitchContent(idea) {
        const prompt = `You are a Venture Capitalist. Generate slide content for a pitch deck based on: "${idea}".
        Return ONLY a valid JSON object following this schema, with no markdown formatting:
        {
          "slides": [
            {"title": "The Problem", "content": "Brief description of the pain point."},
            {"title": "The Solution", "content": "How this app fixes it."}
          ]
        }`;
        
        try {
            const response = await aiService.askGemini(prompt);
            
            // Extract JSON object
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("No JSON object found");
            
            return JSON.parse(jsonMatch[0]);
        } catch (error) {
            console.error("Pitch Service Error:", error);
            return { slides: [] }; // Fallback
        }
    }
}

module.exports = new PitchService();