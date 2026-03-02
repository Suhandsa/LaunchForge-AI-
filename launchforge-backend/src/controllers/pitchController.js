const pool = require("../config/db");
const PptxGenJS = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

exports.exportPitch = async (req, res) => {
  try {
    const { idea_id } = req.body;

    const result = await pool.query(
      "SELECT * FROM ideas WHERE id=$1",
      [idea_id]
    );

    if (!result.rows.length)
      return res.status(404).json({ error: "Idea not found" });

    const idea = result.rows[0];
    const plan = idea.generated_plan;

    const pptx = new PptxGenJS();

    // Slide 1
    let slide = pptx.addSlide();
    slide.addText("LaunchForge AI Pitch Deck", { x: 1, y: 1, fontSize: 30 });

    // Slide 2
    slide = pptx.addSlide();
    slide.addText("Problem", { x: 1, y: 0.5, fontSize: 24 });
    slide.addText(plan.problem || "N/A", { x: 1, y: 1 });

    // Slide 3
    slide = pptx.addSlide();
    slide.addText("Target Users", { x: 1, y: 0.5, fontSize: 24 });
    slide.addText(plan.target_users.join(", "), { x: 1, y: 1 });

    // Slide 4
    slide = pptx.addSlide();
    slide.addText("MVP Features", { x: 1, y: 0.5, fontSize: 24 });
    slide.addText(plan.mvp_features.join(", "), { x: 1, y: 1 });

    // Slide 5
    slide = pptx.addSlide();
    slide.addText("Tech Stack", { x: 1, y: 0.5, fontSize: 24 });
    slide.addText(plan.tech_stack.join(", "), { x: 1, y: 1 });

    const filePath = path.join(__dirname, "../../pitch.pptx");
    await pptx.writeFile({ fileName: filePath });

    res.download(filePath);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Pitch export failed" });
  }
};