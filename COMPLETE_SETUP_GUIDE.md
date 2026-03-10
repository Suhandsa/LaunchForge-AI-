# LaunchForge AI - Complete Project Setup & Integration Guide

## ✅ What's Been Completed

### 1. **Gemini API Integration** ✨
- Installed `@google/generative-ai` package in backend
- Replaced old axios-based AI calls with Google Generative AI SDK
- Updated `.env` with `GEMINI_API_KEY` and `AI_MODE=gemini`
- Configured models: **gemini-1.5-pro** for both idea generation and chat

### 2. **Backend Configuration** 🔧
- **aiService.js**: Fully integrated with Gemini API
  - `generatePlan()`: Analyzes startup ideas and returns structured JSON
  - `chatWithCofounder()`: AI co-founder chat with idea context
  - Fallback to mock responses on API errors
- **Controllers**: All properly configured
  - `ideaController.js`: Handles idea generation and retrieval
  - `chatController.js`: Manages AI conversations
  - `pitchController.js`: Exports pitch decks
- **Database**: PostgreSQL schema with all tables set up
- **Authentication**: JWT-based with bcryptjs password hashing
- **Rate Limiting**: Enabled on all API endpoints

### 3. **Frontend Integration** 🎨
- **IdeaContext**: Created global context to track current idea
  - `useIdea()` hook for accessing current idea state
- **ChatBox Component**: Updated to use real Gemini API
  - Loads chat history from backend
  - Sends messages via chatService
  - Displays real AI responses
  - Error handling and loading states
- **IdeaDetails Page**: Now loads real data from backend
  - Fetches idea details by ID
  - Sets current idea in global context
  - Transforms backend JSON to UI format
- **chatService.js**: Fixed to match backend API endpoints
  - `sendMessage(ideaId, message)`: Send chat message
  - `getChatHistory(ideaId)`: Fetch conversation history
  - `clearChatHistory(ideaId)`: Clear conversation

### 4. **Project Structure**
```
LaunchForge-AI/
├── backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/ (handles API logic)
│   │   ├── services/ (aiService.js - Gemini integration)
│   │   ├── routes/ (API endpoints)
│   │   ├── middleware/ (auth, errors, rate limiting)
│   │   └── config/ (database connection)
│   └── .env (GEMINI_API_KEY, DB credentials)
│
└── frontend (React + Vite)
    ├── src/
    │   ├── components/ (UI components)
    │   ├── pages/ (Dashboard, Ideas, Chat, Pitch, Settings)
    │   ├── services/ (API integrations)
    │   ├── context/ (AuthContext, IdeaContext)
    │   ├── hooks/ (useAuth, useFetch, useIdea)
    │   └── utils/
    └── .env (API_BASE_URL)
```

---

## 🚀 How to Run the Project

### **Prerequisites**
- Node.js v16+ and npm v8+
- PostgreSQL 12+
- Gemini API key from https://ai.google.dev/

### **Step 1: Setup Database**
```bash
# Create database
createdb launchforge_db

# Initialize schema
psql -U postgres -h localhost -d launchforge_db < launchforge-backend/docs/init-db.sql
```

### **Step 2: Configure Environment**

**Backend (.env)**:
```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=launchforge_db
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=launchgen_secret
DATABASE_URL=postgres://postgres:password@localhost:5432/launchforge_db

GEMINI_API_KEY=your_gemini_api_key
AI_MODE=gemini
```

**Frontend (.env)**:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=LaunchForge AI
```

### **Step 3: Install Dependencies**
```bash
# Backend
cd launchforge-backend
npm install

# Frontend
cd ../frontend
npm install
```

### **Step 4: Run Development Servers**

**Terminal 1 - Backend**:
```bash
cd launchforge-backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5174
```

### **Step 5: Access the Application**
Open browser and go to: **http://localhost:5174**

---

## 📋 User Flow

1. **Register/Login**: Create account or sign in
2. **Dashboard**: View all ideas
3. **Generate Idea**: 
   ```
   Input: "AI fitness app for students"
   ↓ (Sent to backend)
   ↓ (Gemini API analyzes with structured prompt)
   Output: Complete business plan (problem, market, competitors, MVP, roadmap, pitch)
   ```
4. **View Details**: Click idea to see full dashboard with:
   - Problem & solution
   - Market size estimates
   - Competitor analysis
   - MVP features
   - 30-day & 90-day roadmaps
   - Idea scores chart
5. **AI Chat**: Click "AI Chat" in navigation
   - Chat directly with AI co-founder
   - Asks questions about your startup
   - Responses based on your idea context
6. **Export Pitch**: Generate PDF/PPT pitch deck
7. **Team Collaboration**: Invite teammates to share ideas

---

## 🔌 API Endpoints

### **Authentication**
```
POST   /api/auth/register     - Create account
POST   /api/auth/login        - Sign in
```

### **Ideas**
```
POST   /api/idea/generate     - Generate idea plan (uses Gemini API)
GET    /api/idea              - Get all user's ideas
GET    /api/idea/:id          - Get specific idea
DELETE /api/idea/:id          - Delete idea
```

### **Chat**
```
POST   /api/chat              - Send message to AI co-founder
GET    /api/chat/:idea_id     - Get chat history
DELETE /api/chat/:idea_id     - Clear chat history
```

### **Pitch**
```
POST   /api/pitch/export      - Generate and export pitch deck
```

---

## 🤖 Gemini API Integration Details

### **Idea Generation Prompt**
The system sends a structured prompt to Gemini that requests:
- Problem statement
- Target user segments
- Market size estimates
- Competitor analysis
- SWOT analysis
- Risks & unique selling point
- MVP feature list
- Tech stack recommendations
- Business model & pricing
- 30-day & 90-day roadmaps
- Pitch summary
- Idea scores

### **Chat Prompt**
The system includes idea context in every chat:
```
You are an experienced AI co-founder and startup mentor.

The user is building the following startup idea:
Problem: [from idea plan]
Target Users: [from idea plan]
MVP Features: [from idea plan]
Business Model: [from idea plan]

Respond to: "[user's question]"
```

### **Error Handling**
- If Gemini API fails, system falls back to mock responses
- Chat shows user-friendly error messages
- Errors logged in console for debugging

---

## 🔐 Authentication Flow

1. User registers with email/password
2. Password hashed with bcryptjs (10 rounds)
3. JWT token generated and stored in localStorage
4. Token sent with every API request in Authorization header
5. Backend verifies token before allowing access
6. 401 errors redirect to login page

---

## 📊 Database Schema

### **users**
- id (UUID primary key)
- email (unique)
- password (hashed)
- name
- created_at, updated_at

### **ideas**
- id (UUID primary key)
- user_id (foreign key)
- idea_text (the user's input)
- generated_plan (JSONB - full Gemini response)
- created_at, updated_at

### **idea_versions**
- Tracks all versions/iterations of an idea
- Allows reverting to previous versions

### **chat_history**
- Stores all conversations between user and AI
- Linked to idea_id for context

### **teams** & **team_members**
- Team collaboration structure
- Allows sharing ideas with team members

### **pitch_decks**
- Stores exported pitch decks
- File paths for generated PDFs/PPTs

---

## ⚙️ Configuration

### **AI_MODE Options**
- `AI_MODE=gemini` - Uses real Gemini API (production)
- `AI_MODE=mock` - Uses mock responses (testing/development)

### **Gemini Model**
- Currently: `gemini-1.5-pro`
- Supports vision, reasoning, and structured output
- ~1M context length

### **Rate Limiting**
- 15 requests per 15 minutes per IP
- Applied to all `/api/*` endpoints
- Prevents abuse and ensures fair usage

---

## 🧪 Testing the Integration

### **Test Idea Generation**
1. Go to dashboard
2. Click "New Idea"
3. Enter: "AI fitness app for students"
4. Watch the response fill with Gemini analysis

### **Test Chat**
1. Go to "AI Chat" page
2. Ensure an idea is selected
3. Ask: "How do I get my first 100 users?"
4. Verify Gemini provides relevant startup advice

---

## 🐛 Troubleshooting

### **Gemini API Error: "models/gemini-pro is not found"**
- Fixed: Now using `gemini-1.5-pro`
- Ensure API key is valid

### **Chat not working**
- Check idea is selected (status shown in context bar)
- Verify API_BASE_URL is correct
- Check network tab for failed requests

### **Database connection fails**
- Verify PostgreSQL is running
- Check .env credentials
- Run init-db.sql script

### **Frontend won't start**
- Ensure port 5174 is available
- Delete node_modules and run `npm install` again
- Check Node.js version (v16+)

---

## 📈 Future Enhancements

1. **Investor Matching API**: Connect with relevant VCs
2. **Domain Name Checker**: Suggest available domain names
3. **AI Logo Generator**: Automated branding
4. **Landing Page Builder**: Auto-generate website
5. **Market Data Integration**: Real-time market trends
6. **Analytics Dashboard**: Idea performance metrics
7. **Slack Integration**: Share updates to Slack
8. **Mobile App**: React Native version

---

## 📝 Notes

- All user data is encrypted and stored securely in PostgreSQL
- Gemini API calls are logged for monitoring and debugging
- Frontend uses React Context for state management (no Redux needed)
- Vite provides hot module replacement for fast development
- Tailwind CSS for styling with custom dark theme
- Chart.js for visualization of idea scores

---

## ✨ Summary

LaunchForge AI is now fully functional with Gemini API integration:
- ✅ User authentication (register/login)
- ✅ AI-powered idea analysis using Gemini
- ✅ Real-time AI co-founder chat
- ✅ Complete startup planning automation
- ✅ Pitch deck generation
- ✅ Team collaboration support
- ✅ Responsive UI with Tailwind CSS
- ✅ PostgreSQL database
- ✅ Rate limiting and security

**The project is ready for use and hackathon demo!**
