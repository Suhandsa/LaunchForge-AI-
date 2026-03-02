import api from "./api";

export const chatService = {
  /**
   * POST /chat/message
   * @param {{ ideaId: string, message: string, history: Array }} payload
   */
  async sendMessage(payload) {
    const { data } = await api.post("/chat/message", payload);
    return data; // { reply: string }
  },

  /**
   * GET /chat/history/:ideaId
   */
  async getHistory(ideaId) {
    const { data } = await api.get(`/chat/history/${ideaId}`);
    return data; // Message[]
  },

  /**
   * DELETE /chat/history/:ideaId
   */
  async clearHistory(ideaId) {
    await api.delete(`/chat/history/${ideaId}`);
  },
};
