# LaunchForge AI - Complete Setup & Run Guide

## 🎯 Project Overview

LaunchForge AI is an AI-powered platform that converts a raw startup idea into a complete execution roadmap. Users enter an idea and the system generates:

- Problem validation
- Market research
- Competitor analysis
- MVP feature list
- Tech stack suggestion
- Business plan
- Execution roadmap
- Investor pitch deck
- AI co-founder chat

## 🏗️ Project Structure

```
LaunchForge-AI/
├── frontend/                    # React + Tailwind CSS frontend
│   ├── src/
│   │   ├── app/                # App routing and providers
│   │   ├── components/         # Reusable React components
│   │   ├── context/            # Auth context
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service calls
│   │   ├── styles/             # CSS files
│   │   └── utils/              # Helpers and constants
│   ├── package.json
│   └── .env                    # Frontend environment variables
│
├── launchforge-backend/         # Node.js + Express backend
│   ├── src/
│   │   ├── app.js              # Express app setup
│   │   ├── server.js           # Server entry point
│   │   ├── controllers/        # Request handlers
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic (AI service)
│   │   ├── middleware/         # Auth, error handling, rate limiting
│   │   ├── config/             # Database config
│   │   └── utils/              # Logger, async handler
│   ├── docs/
│   │   ├── init-db.sql         # Database schema
│   │   └── api-spec.md         # API documentation
│   ├── package.json
│   └── .env                    # Backend environment variables
│
├── ai-prompts/                 # AI prompt templates
├── docs/                       # Documentation
├── setup.sh                    # Mac/Linux setup script
├── setup.bat                   # Windows setup script
└── README.md                   # This file
```

## 📋 Prerequisites

Before running the project, ensure you have:

1. **Node.js** (v16+) and **npm** - [Download](https://nodejs.org/)
2. **PostgreSQL** (v12+) - [Download](https://www.postgresql.org/download/)
3. **Git** - [Download](https://git-scm.com/)

Verify installation:
```bash
node --version
npm --version
psql --version
```

## 🚀 Quick Start (Recommended)

### Step 1: Run Setup Script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

This will:
- Copy `.env` files from examples
- Install all dependencies
- Configure the project

### Step 2: Setup PostgreSQL Database

1. **Start PostgreSQL** (if not running):
   - Windows: PostgreSQL should auto-start; check Services
   - Mac: `brew services start postgresql` 
   - Linux: `sudo service postgresql start`

2. **Create the database**:
```bash
createdb launchforge_db
```

3. **Initialize the schema**:
```bash
psql -U postgres launchforge_db < launchforge-backend/docs/init-db.sql
```

### Step 3: Configure Environment Variables

**Backend** (`launchforge-backend/.env`):
```env
# PostgreSQL Configuration
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=launchforge_db

# Server
PORT=5000
NODE_ENV=development

# JWT (generate a random secret)
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# AI Service (mock for now)
AI_MODE=mock
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_API_KEY=sk-your_key_here

# CORS
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=LaunchForge AI
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd launchforge-backend
npm run dev
```

Expected output:
```
🔥 Server running on port 5000
✅ PostgreSQL Connected
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x ready in XXX ms

➜ Local: http://localhost:5173/
```

### Step 5: Access the Application

Open your browser and navigate to: **http://localhost:5173**

## 📖 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Ideas
- `POST /idea/generate` - Generate startup plan from idea
- `GET /idea` - Get all user's ideas
- `GET /idea/:id` - Get specific idea
- `GET /idea/:id/history` - Get idea version history
- `DELETE /idea/:id` - Delete idea

### Chat
- `POST /chat` - Send message to AI co-founder
- `GET /chat/:idea_id` - Get chat history
- `DELETE /chat/:idea_id` - Clear chat history

### Team
- `POST /team/create` - Create team
- `POST /team/invite` - Invite team member
- `GET /team/:id` - Get team details

### Pitch
- `POST /pitch/export` - Export pitch deck as PPT

## 🔑 Key Features Integrated

### Frontend
- ✅ React Router for navigation
- ✅ Authentication context with real backend auth
- ✅ Axios API client with JWT interceptors
- ✅ Dashboard with idea generation form
- ✅ ChatBox component for AI conversations
- ✅ Charts for idea scoring
- ✅ Competitor analysis display
- ✅ Responsive design with Tailwind CSS
- ✅ Dark theme with custom colors

### Backend
- ✅ Express.js REST API
- ✅ JWT authentication
- ✅ PostgreSQL database with optimized schema
- ✅ Rate limiting on all endpoints
- ✅ Error handling middleware
- ✅ Morgan request logging
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ AI service integration (mock mode + real API support)
- ✅ Chat with context about user's startup

## 🧪 Testing the Application

### Test Registration/Login
1. Go to http://localhost:5173/register
2. Enter email: `test@example.com` and password: `password123`
3. Register successfully
4. You'll be redirected to dashboard

### Test Idea Generation
1. On dashboard, enter an idea: "AI fitness app for students"
2. Click "Generate Plan"
3. Wait for AI response
4. See generated plan, competitors, roadmap

### Test AI Chat
1. Go to "AI Chat" page
2. Ask questions like: "How do I get my first 100 users?"
3. AI co-founder responds with startup advice

## 🔧 Troubleshooting

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:**
- Ensure PostgreSQL is running: `sudo service postgresql status`
- Check DB credentials in `.env`
- Try: `psql -U postgres` to test connection

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Kill the process: `lsof -i :5000` then `kill -9 <PID>`
- Or change PORT in .env

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
cd launchforge-backend
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure `FRONTEND_URL` in backend .env is correct
- Frontend should be running on port 5173
- Backend should be running on port 5000

## 📚 Frontend Architecture

```
App (Router)
├── AuthProvider (Global Auth State)
│   └── useAuth (Custom Hook)
├── Pages
│   ├── Login / Register
│   ├── Dashboard
│   ├── ChatPage
│   ├── IdeaDetails
│   └── PitchDeck
└── Components
    ├── Layout (Navbar, Sidebar)
    ├── Idea Form
    ├── Plan Card
    └── Charts & Timeline
```

## 💾 Database Schema

### Users Table
```sql
id, email, password, name, created_at, updated_at
```

### Ideas Table
```sql
id, user_id, idea_text, generated_plan (JSON), created_at, updated_at
```

### Chat History Table
```sql
id, idea_id, user_id, message, response, created_at
```

### Teams Table
```sql
id, team_name, owner_id, created_at, updated_at
```

See `launchforge-backend/docs/init-db.sql` for complete schema.

## 🚢 Deployment

### Prepare for Production

1. **Update environment variables:**
   - Set `NODE_ENV=production`
   - Use real JWT_SECRET
   - Update DB credentials
   - Configure real AI API keys

2. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```
   This creates `dist/` folder for deployment

3. **Deploy options:**
   - **Frontend:** Vercel, Netlify, GitHub Pages
   - **Backend:** Azure, AWS, DigitalOcean, Heroku
   - **Database:** DigitalOcean Managed DB, AWS RDS

## 📝 Environment Variables Reference

**Backend (.env)**
| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| NODE_ENV | development | Environment |
| DB_USER | postgres | Database user |
| DB_PASSWORD | postgres | Database password |
| DB_HOST | localhost | Database host |
| DB_PORT | 5432 | Database port |
| DB_NAME | launchforge_db | Database name |
| JWT_SECRET | - | JWT signing key |
| AI_MODE | mock | AI mode (mock/real) |
| AI_API_KEY | - | OpenAI API key |
| FRONTEND_URL | http://localhost:5173 | Frontend URL |

**Frontend (.env)**
| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_BASE_URL | http://localhost:5000/api | Backend API URL |
| VITE_APP_NAME | LaunchForge AI | App name |

## 📞 Support & Documentation

- API Docs: See `launchforge-backend/docs/api-spec.md`
- Prompt Design: See `launchforge-backend/docs/prompt-design.md`
- Mock Response: See `docs/mock-response.json`

## 🎓 Learning Resources

- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- PostgreSQL: https://www.postgresql.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs

## ✨ Features Roadmap

- [ ] User profiles and team collaboration
- [ ] Real AI integration (OpenAI/DigitalOcean)
- [ ] PDF/PPT export for pitch decks
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Investor matching
- [ ] Auto landing page builder
- [ ] AI logo generator

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

**Happy building! 🚀** 

For questions or issues, please open an issue on GitHub.
