# 🔗 LaunchForge AI - Component Integration Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│                 http://localhost:5173                   │
│                                                         │
│  ┌────────────────────────────────────────────────┐   │
│  │          REACT FRONTEND (Vite)                 │   │
│  │                                                │   │
│  │  ┌──────────────────────────────────────┐     │   │
│  │  │  AuthContext (useAuth)               │     │   │
│  │  │  - Manages login/logout              │     │   │
│  │  │  - Stores JWT token                  │     │   │
│  │  │  - Handles auth errors               │     │   │
│  │  └──────────────────────────────────────┘     │   │
│  │           ↓                                    │   │
│  │  ┌──────────────────────────────────────┐     │   │
│  │  │  API Services (axios)                │     │   │
│  │  │  - authService.js                    │     │   │
│  │  │  - ideaService.js                    │     │   │
│  │  │  - chatService.js                    │     │   │
│  │  └──────────────────────────────────────┘     │   │
│  │           ↓                                    │   │
│  │  ┌──────────────────────────────────────┐     │   │
│  │  │  Pages & Components                  │     │   │
│  │  │  - Dashboard                         │     │   │
│  │  │  - ChatPage                          │     │   │
│  │  │  - Login/Register                    │     │   │
│  │  │  - IdeaForm, IdeaCard, etc.         │     │   │
│  │  └──────────────────────────────────────┘     │   │
│  └────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                        ↓ HTTP/REST
        ┌───────────────────────────────────┐
        │   BACKEND SERVER (Express.js)    │
        │   http://localhost:5000/api      │
        │                                   │
        │  ┌─────────────────────────────┐ │
        │  │   Routes                    │ │
        │  │   ├─ /auth                  │ │
        │  │   ├─ /idea                  │ │
        │  │   ├─ /chat                  │ │
        │  │   ├─ /team                  │ │
        │  │   └─ /pitch                 │ │
        │  └──────────────┬──────────────┘ │
        │                 ↓                 │
        │  ┌─────────────────────────────┐ │
        │  │   Controllers               │ │
        │  │   ├─ authController         │ │
        │  │   ├─ ideaController         │ │
        │  │   ├─ chatController         │ │
        │  │   ├─ teamController         │ │
        │  │   └─ pitchController        │ │
        │  └──────────────┬──────────────┘ │
        │                 ↓                 │
        │  ┌─────────────────────────────┐ │
        │  │   Services                  │ │
        │  │   └─ aiService.js           │ │
        │  │      (AI/Mock responses)    │ │
        │  └──────────────┬──────────────┘ │
        │                 ↓                 │
        │  ┌─────────────────────────────┐ │
        │  │   Middleware                │ │
        │  │   ├─ authMiddleware         │ │
        │  │   ├─ errorHandler           │ │
        │  │   ├─ rateLimiter            │ │
        │  │   └─ logger                 │ │
        │  └──────────────┬──────────────┘ │
        │                 ↓                 │
        │  ┌─────────────────────────────┐ │
        │  │   Database Config           │ │
        │  │   (PostgreSQL Connection)   │ │
        │  └─────────────────────────────┘ │
        └───────────────────────────────────┘
                        ↓ SQL
        ┌──────────────────────────────────┐
        │   POSTGRESQL DATABASE            │
        │   localhost:5432                 │
        │                                  │
        │  Tables:                         │
        │  ├─ users                        │
        │  ├─ ideas                        │
        │  ├─ idea_versions                │
        │  ├─ chat_history                 │
        │  ├─ teams                        │
        │  ├─ team_members                 │
        │  └─ pitch_decks                  │
        └──────────────────────────────────┘
```

## Data Flow Examples

### 1. User Registration Flow

```
User Input (Email, Password)
        ↓
   [Register.jsx]
        ↓
   [useAuth.register()]
        ↓
   [authService.register()]
        ↓
   [POST /api/auth/register]
        ↓
   [authController.register()]
        ↓
   Hash Password + Create User
        ↓
   [INSERT INTO users]
        ↓
   Return JWT Token
        ↓
   Store in localStorage
        ↓
   Redirect to Dashboard
```

### 2. Idea Generation Flow

```
User Text (Idea)
        ↓
   [IdeaForm.jsx]
        ↓
   [Dashboard.handleGenerate()]
        ↓
   [ideaService.generate()]
        ↓
   [POST /api/idea/generate]
        ↓
   [ideaController.generateIdea()]
        ↓
   Call AI Service (aiService.generatePlan())
        ↓
   Return JSON Plan
        ↓
   [INSERT INTO ideas, idea_versions]
        ↓
   Return to Frontend
        ↓
   [Display Plan Components]
        ↓
   User sees: Problem, MVP, Roadmap, Competitors
```

### 3. AI Chat Flow

```
User Message (Text)
        ↓
   [ChatBox.jsx]
        ↓
   [chatService.sendMessage()]
        ↓
   [POST /api/chat]
        ↓
   [chatController.chat()]
        ↓
   Get Idea Context (stored plan)
        ↓
   Call AI Service with Context
        ↓
   [INSERT INTO chat_history]
        ↓
   Return AI Response
        ↓
   [MessageBubble.jsx] Display
        ↓
   User sees AI Co-founder Advice
```

## Component Dependencies

### Frontend Component Tree

```
main.jsx
  └─ App.jsx
     └─ AuthProvider (context)
        └─ Router (react-router)
           ├─ Login.jsx
           ├─ Register.jsx
           └─ PageLayout.jsx (Protected)
              ├─ Navbar.jsx
              ├─ Sidebar.jsx
              └─ Outlet (Router)
                 ├─ Dashboard.jsx
                 │  ├─ IdeaForm.jsx
                 │  ├─ IdeaPlanCard.jsx
                 │  ├─ ScoreChart.jsx
                 │  ├─ RoadmapTimeline.jsx
                 │  └─ CompetitorList.jsx
                 ├─ ChatPage.jsx
                 │  └─ ChatBox.jsx
                 │     └─ MessageBubble.jsx
                 ├─ IdeaDetails.jsx
                 ├─ PitchDeck.jsx
                 └─ Settings.jsx
```

### Services & Context

```
AuthContext.jsx
  ├─ login() → authService.login()
  ├─ register() → authService.register()
  └─ logout() → authService.logout()

ideaService.js
  ├─ generate() → POST /api/idea/generate
  ├─ getAll() → GET /api/idea
  └─ getById() → GET /api/idea/:id

chatService.js
  ├─ sendMessage() → POST /api/chat
  ├─ getHistory() → GET /api/chat/:ideaId
  └─ clearHistory() → DELETE /api/chat/:ideaId

authService.js
  ├─ login() → POST /api/auth/login
  ├─ register() → POST /api/auth/register
  ├─ logout() → POST /api/auth/logout
  └─ me() → GET /api/auth/me
```

## Backend Route & Controller Mapping

```
POST /auth/register        → authController.register()
POST /auth/login           → authController.login()
GET  /auth/me              → authController.getCurrentUser()

POST /idea/generate        → ideaController.generateIdea()
GET  /idea                 → ideaController.getAllIdeas()
GET  /idea/:id             → ideaController.getIdeaById()
GET  /idea/:id/history     → ideaController.getIdeaHistory()
DELETE /idea/:id           → ideaController.deleteIdea()

POST /chat                 → chatController.chat()
GET  /chat/:idea_id        → chatController.getChatHistory()
DELETE /chat/:idea_id      → chatController.clearChatHistory()

POST /team/create          → teamController.createTeam()
POST /team/invite          → teamController.inviteMember()
GET  /team/:id             → teamController.getTeam()

POST /pitch/export         → pitchController.exportPitch()
```

## Database Relationships

```
users (1) ──┬──→ (N) ideas
            ├──→ (N) chat_history
            ├──→ (N) teams (as owner)
            └──→ (N) team_members

ideas (1) ──┬──→ (N) idea_versions
            ├──→ (N) chat_history
            └──→ (N) pitch_decks

teams (1) ──┬──→ (N) team_members
            └──→ (N) ideas (if team_ideas table added)

chat_history (many) belongs to (one) idea and (one) user
```

## Request/Response Cycle Example

### Register Request
```
CLIENT REQUEST:
POST /api/auth/register
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "secure123",
  "name": "John Doe"
}

SERVER RESPONSE (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Idea Generation Request
```
CLIENT REQUEST:
POST /api/idea/generate
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
{
  "idea": "AI fitness app for students"
}

SERVER RESPONSE (200):
{
  "idea_id": "550e8400-e29b-41d4-a716-446655440001",
  "version": 1,
  "generated_plan": {
    "problem": "Students lack personalized fitness...",
    "target_users": ["College students", "..."],
    "competitors": [...],
    "mvp_features": [...],
    "tech_stack": [...],
    "roadmap_30_days": [...],
    "idea_score": {
      "market": 8,
      "profit": 7,
      "difficulty": 6,
      "success_probability": 8
    }
  }
}
```

## Environment & Configuration

### Frontend Environment Loading
```
src/utils/constants.js
  ├─ API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  │  (from frontend/.env or defaults to http://localhost:5000/api)
  │
  ├─ STORAGE_KEYS (localStorage keys)
  │  ├─ lf_token (JWT)
  │  └─ lf_user (User object)
  │
  └─ Other constants...
```

### Backend Environment Loading
```
launchforge-backend/.env
  ├─ Database config (DB_USER, DB_HOST, etc.)
  ├─ Server config (PORT, NODE_ENV)
  ├─ JWT_SECRET (for token signing)
  ├─ AI service config (AI_MODE, AI_API_KEY)
  └─ CORS config (FRONTEND_URL)
```

## Integration Checklist

✅ **Authentication:**
- [x] JWT token generation and validation
- [x] Login/Register with password hashing
- [x] Protected routes with authMiddleware
- [x] Token stored in localStorage
- [x] Automatic redirect on 401

✅ **Database:**
- [x] PostgreSQL connection configured
- [x] All tables created with proper relationships
- [x] Indexes for performance
- [x] Auto-timestamp triggers

✅ **API:**
- [x] All routes integrated
- [x] Request validation
- [x] Error handling
- [x] CORS enabled
- [x] Rate limiting
- [x] Morgan logging

✅ **Frontend Pages:**
- [x] Dashboard shows real data
- [x] Auth pages connected to backend
- [x] Chat integrates with backend
- [x] Services use real API endpoints

✅ **AI Integration:**
- [x] Mock mode for testing
- [x] Real AI API support prepared
- [x] Context-aware responses
- [x] Response storage

## Testing Integration

1. **Check Network Tab:**
   - Open DevTools (F12) → Network tab
   - Perform action (login, generate idea)
   - Verify API calls to http://localhost:5000/api

2. **Check Local Storage:**
   - DevTools → Application → Local Storage
   - Should see `lf_token` and `lf_user` keys

3. **Check Database:**
   - `psql launchforge_db`
   - `SELECT * FROM users;` (after registration)
   - `SELECT * FROM ideas;` (after idea generation)

---

**Understanding this integration helps you:**
- Debug issues efficiently
- Add new features easily
- Scale the application
- Optimize performance
