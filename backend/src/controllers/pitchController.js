const pool = require("../config/db");
const PptxGenJS = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

exports.exportPitch = async (req, res) => {
  try {
    const { idea_id } = req.body;
    if (!idea_id) throw new Error("idea_id is missing");

    const result = await pool.query("SELECT * FROM ideas WHERE id=$1", [idea_id]);
    if (!result.rows.length) return res.status(404).json({ error: "Idea not found" });

    const idea = result.rows[0];
    let plan = {};
    
    if (typeof idea.generated_plan === "string") {
      try { plan = JSON.parse(idea.generated_plan); } catch(e){}
    } else if (idea.generated_plan) {
      plan = idea.generated_plan;
    }

    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_16x9";

    pptx.defineSlideMaster({
      title: "MODERN_MASTER",
      background: { color: "0B0F19" },
      objects: [
        { rect: { x: 0, y: 0, w: 0.15, h: "100%", fill: { color: "6366F1" } } }
      ],
      slideNumber: { x: 9.5, y: 5.3, color: "6B7280", fontFace: "Helvetica" }
    });

    const masterSlide = (title = "", contentLines = []) => {
      const slide = pptx.addSlide({ masterName: "MODERN_MASTER" });
      
      slide.addText(String(title), {
        x: 0.6, y: 0.5, w: 8.5, h: 0.8,
        fontSize: 34, bold: true, color: "FFFFFF", fontFace: "Helvetica"
      });

      const safeLines = contentLines.filter(Boolean).map(item => String(item));

      if (safeLines.length > 0) {
        slide.addText(
          safeLines.map(text => ({
            text,
            options: { bullet: { type: 'number', color: '6366F1' }, breakLine: true }
          })), 
          {
            x: 0.6, y: 1.5, w: 8.5, h: 3.5,
            fontSize: 16, color: "E5E7EB", fontFace: "Helvetica",
            valign: "top", lineSpacing: 28 
          }
        );
      }
      return slide;
    };

    const slide1 = pptx.addSlide();
    slide1.background = { color: "07090F" };
    
    slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "6366F1", transparency: 85 }});
    
    slide1.addText("LaunchGen AI", {
      x: 0.5, y: 1.8, w: 9, fontSize: 20, color: "A5B4FC", align: "center", bold: true, tracking: 2
    });
    
    slide1.addText(idea.idea_text ? String(idea.idea_text).substring(0, 50) + "..." : "Investor Pitch Deck", {
      x: 0.5, y: 2.5, w: 9, fontSize: 44, bold: true, color: "FFFFFF", align: "center"
    });

    masterSlide("The Problem", [plan.problem || "Problem not defined"]);
    
    masterSlide("The Solution", [
      `Unique Value: ${plan.usp || "Not defined"}`,
      `Core Features: ${(Array.isArray(plan.mvp_features) ? plan.mvp_features : []).join(", ") || "None listed"}`
    ]);

    masterSlide("Market Opportunity", [
      `Target Users: ${(Array.isArray(plan.target_users) ? plan.target_users : []).join(", ") || "None listed"}`,
      `Market Size: ${plan.market_size || "To be determined"}`
    ]);

    masterSlide("Revenue Model", [
      `Monetization Strategy: ${plan.business_plan?.monetization || "Not defined"}`,
      `Pricing Model: ${plan.business_plan?.pricing || "To be determined"}`,
      `Acquisition: ${plan.business_plan?.acquisition || "To be determined"}`
    ]);

    masterSlide("Competition", [
      `Key Competitors: ${(Array.isArray(plan.competitors) ? plan.competitors : []).map(c => c?.name || c).join(", ") || "None listed"}`,
      `Our Advantage: ${plan.usp || "To be defined"}`
    ]);

    masterSlide("Traction & Roadmap", [
      "30-Day Sprint:",
      ...(Array.isArray(plan.roadmap_30_days) ? plan.roadmap_30_days : []).slice(0, 3),
      "90-Day Vision:",
      ...(Array.isArray(plan.roadmap_90_days) ? plan.roadmap_90_days : []).slice(0, 2)
    ]);

    masterSlide("The Ask", [
      "We are seeking partnership and resources to:",
      "Build and launch the MVP.",
      "Acquire our first 1,000 users.",
      "Achieve product-market fit."
    ]);

    const filePath = path.join(__dirname, "../../exports/pitch_" + Date.now() + ".pptx");
    const exportDir = path.dirname(filePath);
    
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    await pptx.writeFile({ fileName: filePath });

    res.download(filePath, "pitch_deck.pptx", () => {
      fs.unlink(filePath, err => { if (err) console.error(err); });
    });

  } catch (err) {
    console.error("🔥 CRITICAL PITCH ERROR:", err);
    res.status(500).json({ error: "Pitch export failed", details: err.message });
  }
};