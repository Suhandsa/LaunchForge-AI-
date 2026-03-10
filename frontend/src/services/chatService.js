import api from "./api";

export const chatService = {
  /**
   * POST /api/chat
   * Send message to AI co-founder
   */
  async sendMessage(ideaId, message) {
    const { data } = await api.post("/chat", {
      idea_id: ideaId,
      message
    });
    return data;
  },

  /**
   * GET /api/chat/:ideaId
   * Get chat history for an idea
   */
  async getChatHistory(ideaId) {
    const { data } = await api.get(`/chat/${ideaId}`);
    return data;
  },

  /**
   * DELETE /api/chat/:ideaId
   * Clear chat history
   */
  async clearChatHistory(ideaId) {
    const { data } = await api.delete(`/chat/${ideaId}`);
    return data;
  }
};
