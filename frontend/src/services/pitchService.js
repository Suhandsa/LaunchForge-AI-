import api from "./api";

export const pitchService = {
  /**
   * POST /api/pitch/export
   * Export pitch deck as PPTX
   */
  async exportPitch(ideaId) {
    try {
      const response = await api.post(
        "/pitch/export",
        { idea_id: ideaId },
        { 
          responseType: "blob",
          timeout: 60000 // 60 second timeout for export
        }
      );
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `startup_plan_${new Date().getTime()}.pptx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (err) {
      console.error("Pitch export error:", err);
      throw err;
    }
  }
};
