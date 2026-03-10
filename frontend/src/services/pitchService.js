import api from "./api";

export const pitchService = {
  /**
   * POST /api/pitch/export
   * Export pitch deck as PPTX
   */
  async exportPitch(ideaId) {
    const response = await api.post(
      "/pitch/export",
      { idea_id: ideaId },
      { responseType: "blob" }
    );
    
    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `pitch_${new Date().getTime()}.pptx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  }
};
