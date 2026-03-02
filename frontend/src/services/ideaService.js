import api from "./api";

export const ideaService = {
  /**
   * POST /ideas/generate
   * Sends a prompt and receives the full AI-generated plan.
   * @param {{ prompt: string }} payload
   */
  async generate(payload) {
    const { data } = await api.post("/ideas/generate", payload);
    return data; // { plan, scores, roadmap, competitors, pitchDeck }
  },

  /**
   * GET /ideas
   * Fetch all ideas for the current user.
   */
  async getAll() {
    const { data } = await api.get("/ideas");
    return data; // Idea[]
  },

  /**
   * GET /ideas/:id
   */
  async getById(id) {
    const { data } = await api.get(`/ideas/${id}`);
    return data;
  },

  /**
   * DELETE /ideas/:id
   */
  async remove(id) {
    await api.delete(`/ideas/${id}`);
  },

  /**
   * PATCH /ideas/:id/favourite
   */
  async toggleFavourite(id) {
    const { data } = await api.patch(`/ideas/${id}/favourite`);
    return data;
  },
};
