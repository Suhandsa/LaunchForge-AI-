const fs = require('fs');
const path = require('path');
const axios = require('axios');

class AIService {
    constructor() {
        this.apiKey = process.env.DIGITALOCEAN_AI_KEY;
        this.endpoint = process.env.DIGITALOCEAN_AI_ENDPOINT;
    }

    getPromptTemplate(fileName, data) {
        const filePath = path.join(__dirname, '../../../../ai-prompts', `${fileName}.txt`);
        let prompt = fs.readFileSync(filePath, 'utf8');
        Object.keys(data).forEach(key => {
            prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), data[key]);
        });
        return prompt;
    }

    async callDigitalOceanAI(promptText) {
        try {
            const response = await axios.post(this.endpoint, {
                model: "meta-llama-3-1-70b-instruct",
                messages: [
                    { role: "system", content: "You are a startup mentor. Always return structured JSON." },
                    { role: "user", content: promptText }
                ]
            }, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("DO AI Error:", error.message);
            return null;
        }
    }

    async generateFullPlan(idea) {
        const prompt = this.getPromptTemplate('idea-analysis', { idea });
        const rawJson = await this.callDigitalOceanAI(prompt);
        return JSON.parse(rawJson);
    }
}

module.exports = new AIService();