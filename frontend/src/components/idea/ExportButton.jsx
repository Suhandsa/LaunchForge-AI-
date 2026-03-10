/**
 * ExportButton — button to download pitch deck
 */
import { Download } from "lucide-react";
import { pitchService } from "../../services/pitchService";

export default function ExportButton({ ideaId, loading = false }) {
  const handleExport = async () => {
    try {
      await pitchService.exportPitch(ideaId);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export pitch deck");
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="px-4 py-2.5 flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold text-[13px] rounded-lg hover:shadow-lg hover:shadow-[rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      <Download size={16} />
      {loading ? "Exporting..." : "Export Pitch Deck"}
    </button>
  );
}
