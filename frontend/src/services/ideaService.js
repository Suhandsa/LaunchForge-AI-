import api from "./api";

export const ideaService = {
  /**
   * POST /idea/generate
   * Sends a prompt and receives the full AI-generated plan.
   * @param {{ idea: string }} payload
   */
  async generateIdea(payload) {
    const { data } = await api.post("/idea/generate", payload);
    return data; // { idea_id, version, generated_plan }
  },

  /**
   * GET /idea
   * Fetch all ideas for the current user.
   */
  async getAllIdeas() {
    const { data } = await api.get("/idea");
    return data; // Idea[]
  },

  /**
   * GET /idea/:id
   */
  async getIdeaById(id) {
    const { data } = await api.get(`/idea/${id}`);
    return data;
  },

  /**
   * DELETE /idea/:id
   */
  async deleteIdea(id) {
    await api.delete(`/idea/${id}`);
  },

  /**
   * PATCH /idea/:id/favourite
   */
  async toggleFavourite(id) {
    const { data } = await api.patch(`/idea/${id}/favourite`);
    return data;
  },
};
