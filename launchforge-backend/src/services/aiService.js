const axios = require("axios");

const mockPlan = () => ({
  problem: "Students lack personalized fitness plans.",
  target_users: ["College students", "Gym beginners"],
  competitors: ["Nike Training Club", "Fitbod"],
  mvp_features: [
    "Workout generator",
    "Progress tracker",
    "AI chatbot coach"
  ],
  tech_stack: ["React", "Node.js", "PostgreSQL"],
  roadmap_30_days: [
    "Build MVP UI",
    "Setup backend",
    "Test with 10 users"
  ],
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

  try {
    const response = await axios.post(
      process.env.AI_API_URL,
      {
        prompt: `You are a startup mentor. Analyze idea: ${idea}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`
        },
        timeout: 20000
      }
    );

    return response.data;
  } catch (err) {
    console.error("AI ERROR:", err.message);
    return mockPlan();
  }
};