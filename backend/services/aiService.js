const fs = require('fs');
const path = require('path');
// If using OpenAI: const OpenAI = require('openai');
// If using DigitalOcean GenAI, replace with their SDK

/**
 * Service to handle AI Prompt Logic
 */
class AIService {
    constructor() {
        // Mocking the AI call for now so your team can work immediately
        this.useMock = true; 
    }

    // Helper to read prompt files
    getPrompt(fileName, idea) {
        const filePath = path.join(__dirname, '../../ai-prompts', `${fileName}.txt`);
        let prompt = fs.readFileSync(filePath, 'utf8');
        return prompt.replace('{idea}', idea);
    }

    async generateStartupPlan(idea) {
        if (this.useMock) {
            return {
                problem_statement: `Lack of specialized fitness tools for students like: ${idea}`,
                target_users: ["College Students", "Busy Academics"],
                market_size: "$2B Student Wellness Market",
                idea_score: { market_demand: 85, feasibility: 90, profit_potential: 75 },
                mvp_features: ["Budget meal planner", "Dorm room workouts"]
            };
        }

        // Logic for actual AI call (example using OpenAI style)
        /*
        const prompt = this.getPrompt('idea-analysis', idea);
        const response = await aiClient.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });
        return JSON.parse(response.choices[0].message.content);
        */
    }
}

module.exports = new AIService();