import api from "./api";

export const teamService = {
  /**
   * POST /api/team/create
   * Create a new team  
   */
  async createTeam(payload) {
    const { data } = await api.post("/team/create", payload);
    return data;
  },

  /**
   * GET /api/team/:id
   * Get team details and members
   */
  async getTeam(teamId) {
    const { data } = await api.get(`/team/${teamId}`);
    return data;
  },

  /**
   * POST /api/team/invite
   * Invite a member to team
   */
  async inviteMember(payload) {
    const { data } = await api.post("/team/invite", payload);
    return data;
  }
};
