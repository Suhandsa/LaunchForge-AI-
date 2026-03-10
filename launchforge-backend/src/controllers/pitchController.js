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
    pptx.defineLayout({ name: "TITLE", master: true });

    const masterSlide = (title = "", content = []) => {
      const slide = pptx.addSlide();
      slide.background = { color: "07090F" };
      
      // Title
      slide.addText(title, {
        x: 0.5,
        y: 0.3,
        w: 9,
        fontSize: 32,
        bold: true,
        color: "E5E7EB",
        fontFace: "Arial"
      });

      let yPos = 1.2;
      content.forEach((item) => {
        slide.addText(item, {
          x: 0.8,
          y: yPos,
          w: 8.4,
          fontSize: 14,
          color: "E5E7EB",
          fontFace: "Arial",
          bullets: true
        });
        yPos += 0.5;
      });

      return slide;
    };

    // Slide 1: Cover
    const slide1 = pptx.addSlide();
    slide1.background = { color: "07090F" };
    slide1.addText("LaunchGen AI Pitch Deck", {
      x: 0.5,
      y: 2.5,
      w: 9,
      fontSize: 44,
      bold: true,
      color: "6366F1",
      align: "center"
    });
    slide1.addText("Turning Your Idea Into Reality", {
      x: 0.5,
      y: 3.5,
      w: 9,
      fontSize: 18,
      color: "22D3EE",
      align: "center"
    });

    // Slide 2: Problem
    masterSlide("Problem", [plan.problem || "Problem not defined"]);

    // Slide 3: Solution
    const solutionContent = [
      `MVP Features: ${(plan.mvp_features || []).join(", ")}`,
      `Unique Value: ${plan.usp || "Not defined"}`
    ];
    masterSlide("Solution", solutionContent);

    // Slide 4: Market
    const marketContent = [
      `Target Users: ${(plan.target_users || []).join(", ")}`,
      `Market Size: ${plan.market_size || "To be determined"}`
    ];
    masterSlide("Market Opportunity", marketContent);

    // Slide 5: Revenue Model
    const revenueContent = [
      `Monetization: ${plan.business_plan?.monetization || "Not defined"}`,
      `Pricing: ${plan.business_plan?.pricing || "To be determined"}`
    ];
    masterSlide("Revenue Model", revenueContent);

    // Slide 6: Competition
    const competitorContent = [
      `Competitors: ${(plan.competitors || []).join(", ")}`,
      `Our Advantage: ${plan.usp || "To be defined"}`
    ];
    masterSlide("Competition", competitorContent);

    // Slide 7: Traction
    const tractionContent = [
      "30-Day Goals:",
      ...((plan.roadmap_30_days || []).slice(0, 3)),
      "",
      "90-Day Vision:",
      ...((plan.roadmap_90_days || []).slice(0, 2))
    ];
    masterSlide("Traction & Roadmap", tractionContent);

    // Slide 8: Tech Stack
    masterSlide("Technology", [`Tech Stack: ${(plan.tech_stack || []).join(", ")}`]);

    // Slide 9: Ask
    const askContent = [
      "We're seeking partnership and resources to:",
      "Build and launch the MVP",
      "Acquire initial users",
      "Achieve product-market fit"
    ];
    masterSlide("The Ask", askContent);

    const filePath = path.join(__dirname, "../../exports/pitch_" + Date.now() + ".pptx");
    
    // Ensure exports directory exists
    const exportDir = path.dirname(filePath);
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    await pptx.writeFile({ fileName: filePath });

    res.download(filePath, "pitch_deck.pptx", () => {
      // Clean up file after download
      // fs.unlink(filePath, err => { if (err) console.error(err); });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Pitch export failed" });
  }
};