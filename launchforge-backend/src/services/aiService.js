const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const mockPlan = () => ({
  problem: "Students lack personalized fitness plans.",
  target_users: ["College students", "Gym beginners"],
  market_size: "10 million potential users",
  competitors: [
    {
      name: "Nike Training Club",
      logo: "NT",
      color: "#FF6B35",
      pricing: "Freemium",
      strengths: ["Brand recognition", "Wide reach"],
      weaknesses: ["Generic workouts", "Not personalized"],
      score: 75
    },
    {
      name: "Fitbod",
      logo: "FB",
      color: "#4ECDC4",
      pricing: "$10/month",
      strengths: ["AI-powered", "Data tracking"],
      weaknesses: ["Limited community", "High price"],
      score: 72
    },
    {
      name: "Peloton",
      logo: "PL",
      color: "#FF006E",
      pricing: "$39/month",
      strengths: ["Premium content", "Community"],
      weaknesses: ["Expensive hardware", "Limited flexibility"],
      score: 68
    },
    {
      name: "Strava",
      logo: "SV",
      color: "#FC6017",
      pricing: "Freemium",
      strengths: ["Social features", "GPS tracking"],
      weaknesses: ["Not AI-driven", "Focused on cycling"],
      score: 65
    }
  ],
  swot: {
    strengths: ["AI recommendations", "Personalized coaching", "Mobile-first design"],
    weaknesses: ["New market player", "Limited initial user base", "cold start problem"],
    opportunities: ["University partnerships", "Corporate wellness", "Global expansion"],
    threats: ["Established fitness apps", "Big tech competition", "User acquisition cost"]
  },
  risks: ["data privacy compliance", "market saturation", "user retention", "AI accuracy"],
  usp: "Adaptive workout plans using AI",
  mvp_features: [
    "Workout generator",
    "Progress tracker",
    "AI chatbot coach",
    "Exercise library",
    "Performance analytics"
  ],
  tech_stack: ["React", "Node.js", "PostgreSQL", "TensorFlow", "AWS"],
  business_plan: {
    monetization: "subscription",
    pricing: "5$/month",
    acquisition: "social media ads"
  },
  roadmap_30_days: [
    "Build MVP UI",
    "Setup backend",
    "Test with 10 users",
    "Implement AI engine"
  ],
  roadmap_90_days: [
    "Add analytics",
    "Open beta",
    "Begin marketing campaign",
    "Reach 1000 users"
  ],
  pitch_summary: {
    problem: "Students need tailored fitness",
    solution: "AI workout app",
    market: "Gen Z fitness market",
    revenue: "Subscription model",
    competition: "Large fitness brands",
    traction: "Pilot with 100 users"
  },
  idea_score: {
    market: 7,
    profit: 8,
    difficulty: 6,
    success_probability: 7
  }
});

exports.generatePlan = async (idea) => {
  if (process.env.AI_MODE === "mock") {
    return mockPlan();
  }

  const buildPrompt = (text) => `You are an expert startup mentor and product manager.
Analyze the following idea and return ONLY valid JSON (no other text) with these keys:
  - problem: describe the core problem being solved
  - target_users: array of user segments
  - market_size: estimate size or value
  - competitors: array of objects with {name, logo, color, pricing, strengths, weaknesses, score}
  - swot: { strengths, weaknesses, opportunities, threats }
  - risks: array of risks
  - usp: unique selling point
  - mvp_features: array of features for MVP
  - tech_stack: array of suggested technologies
  - business_plan: { monetization, pricing, acquisition }
  - roadmap_30_days: array of milestones
  - roadmap_90_days: array of milestones
  - pitch_summary: { problem, solution, market, revenue, competition, traction }
  - idea_score: { market, profit, difficulty, success_probability }

Idea: "${text}"`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(buildPrompt(idea));
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    
    const payload = JSON.parse(jsonMatch[0]);
    return payload;
  } catch (err) {
    console.error("AI ERROR:", err.message);
    return mockPlan();
  }
};

/**
 * Generate a chat response from the AI co-founder with idea context
 */
exports.chatWithCofounder = async (ideaPlan, userMessage) => {
  if (process.env.AI_MODE === "mock") {
    const mockResponses = [
      "Great question! Based on your startup idea, I'd recommend starting with user validation. Talk to at least 20 potential customers before writing code.",
      "For your MVP, focus on the core problem. You can add fancy features later. What's the smallest viable product that solves your core problem?",
      "Your business model looks solid. The key to success is market fit. Make sure you understand your customer's pain points deeply.",
      "Fundraising is important, but don't let it distract you from building. Get traction first, the money will follow.",
      "Your tech stack choice makes sense. Now focus on shipping fast and getting user feedback. Speed to market is critical."
    ];
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }

  const chatPrompt = `You are an experienced AI co-founder and startup mentor.

The user is building the following startup idea:
Problem: ${ideaPlan.problem || ''}
Target Users: ${(ideaPlan.target_users || []).join(', ')}
MVP Features: ${(ideaPlan.mvp_features || []).join(', ')}
Business Model: ${ideaPlan.business_plan?.monetization || ''}

Respond helpfully and concisely (2-3 sentences) to the user's question:
"${userMessage}"

Do not return JSON, just provide a helpful response.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(chatPrompt);
    const response = await result.response;
    const text = response.text();
    return text.trim();
  } catch (err) {
    console.error("Chat AI ERROR:", err.message);
    return "I'm experiencing technical difficulties. Please try again in a moment.";
  }
};