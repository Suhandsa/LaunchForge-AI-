const fs = require('fs');
const path = require('path');
const axios = require('axios'); // DigitalOcean AI usually interacts via REST API

class AIService {
    constructor() {
        // DigitalOcean GenAI configuration
        this.apiKey = process.env.DIGITALOCEAN_AI_KEY;
        this.endpoint = process.env.DIGITALOCEAN_AI_ENDPOINT; 
    }

    /**
     * Helper to read prompts from your ai-prompts/ folder
     */
    getPromptTemplate(fileName, data) {
        const filePath = path.join(__dirname, '../../../ai-prompts', `${fileName}.txt`);
        let prompt = fs.readFileSync(filePath, 'utf8');
        
        // Replace placeholders like {idea} with actual user input
        Object.keys(data).forEach(key => {
            prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), data[key]);
        });
        
        return prompt;
    }

    /**
     * The main function to call DigitalOcean AI
     */
    async callDigitalOceanAI(promptText) {
        try {
            // This follows DigitalOcean's standard AI Inference request pattern
            const response = await axios.post(this.endpoint, {
                model: "meta-llama-3-1-70b-instruct", // or your DO chosen model
                messages: [
                    { role: "system", content: "You are a startup mentor. Return only JSON." },
                    { role: "user", content: promptText }
                ],
                json_mode: true 
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("DigitalOcean AI Error:", error.message);
            // Fallback for your teammates so they can keep working if API fails
            return this.getMockResponse();
        }
    }

    async generateStartupPlan(idea) {
        const prompt = this.getPromptTemplate('idea-analysis', { idea });
        const result = await this.callDigitalOceanAI(prompt);
        return JSON.parse(result);
    }

    getMockResponse() {
        return JSON.stringify({
            problem_statement: "Mock Problem for Idea",
            target_users: ["Students", "Founders"],
            idea_score: { market_demand: 80, feasibility: 70 }
        });
    }
}

module.exports = new AIService();