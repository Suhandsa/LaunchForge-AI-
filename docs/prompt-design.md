# LaunchGen AI Prompt Design

## 1. Idea Analysis
- **File:** `ai-prompts/idea-analysis.txt`
- **Model:** Meta-Llama-3-1-70b-Instruct
- **Input:** {idea}
- **Output:** JSON (Problem, Users, SWOT, Features)

## 2. Pitch Deck
- **File:** `ai-prompts/pitch-deck.txt`
- **Logic:** Converts analysis into 5 distinct slide structures.

## 3. Scoring Logic
- **Formula:** $Success = (D \times 0.4) + (F \times 0.4) + (P \times 0.2)$
- **Status Thresholds:** >75 (Green), 50-75 (Yellow), <50 (Red)