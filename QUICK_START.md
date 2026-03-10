# 🚀 LaunchForge AI - Quick Run Commands

## ✅ Prerequisites Checklist

- [ ] Node.js v16+ installed (`node --version`)
- [ ] PostgreSQL v12+ installed and running (`psql --version`)
- [ ] Git installed
- [ ] Project cloned/downloaded

## 📦 Step 1: Install Dependencies

### Option A: Using Setup Scripts (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

### Option B: Manual Installation

**Backend:**
```bash
cd launchforge-backend
npm install
cd ..
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

## 🗄️ Step 2: Setup Database

### Create Database
```bash
createdb launchforge_db
```

### Initialize Schema
```bash
psql -U postgres launchforge_db < launchforge-backend/docs/init-db.sql
```

**On Windows with pgAdmin:**
```bash
psql -U postgres -h localhost -d launchforge_db -f launchforge-backend\docs\init-db.sql
```

## ⚙️ Step 3: Configure Environment

**Backend** (`launchforge-backend/.env`):
```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=launchforge_db
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key
AI_MODE=mock
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=LaunchGen AI
```

## ▶️ Step 4: Run the Application

### Terminal 1 - Backend (Port 5000)
```bash
cd launchforge-backend
npm run dev
```

**Expected Output:**
```
🔥 Server running on port 5000
✅ PostgreSQL Connected
```

### Terminal 2 - Frontend (Port 5173)
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x ready in XXX ms
➜ Local: http://localhost:5173/
```

## 🌐 Access the Application

Open your browser:
```
http://localhost:5173
```

## 🧪 Test the Features

### 1. Register/Login
- Navigate to register page
- Create account with test@example.com / password123
- Login

### 2. Generate Idea Plan
- Enter: "AI fitness app for students"
- See generated plan, competitors, and roadmap

### 3. AI Chat
- Go to "AI Chat" page
- Ask: "How do I get first users?"

## 🔗 Available Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/idea/generate` | Generate plan |
| GET | `/api/idea` | Get all ideas |
| GET | `/api/idea/:id` | Get idea details |
| POST | `/api/chat` | Send chat message |
| GET | `/api/chat/:ideaId` | Get chat history |

## 📊 Project Architecture

```
Frontend (React) ←→ Backend (Express.js) ←→ PostgreSQL
:5173              :5000                      localhost:5432
```

## ⛔ Troubleshooting

### Port 5000 Already in Use
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>

# Or change PORT in backend .env
```

### Port 5173 Already in Use
```bash
# Kill the process using port 5173
lsof -i :5173
kill -9 <PID>
```

### PostgreSQL Connection Error
```bash
# Test PostgreSQL connection
psql -U postgres

# If error, start PostgreSQL:
# Windows: Services > PostgreSQL
# Mac: brew services start postgresql
# Linux: sudo service postgresql start
```

### Dependencies Missing
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Error
```bash
# Check if backend is running on port 5000
# Check VITE_API_BASE_URL in frontend/.env
# Backend CORS setting: FRONTEND_URL=http://localhost:5173
```

## 🔐 Default Test Credentials

**After setup, register a new account or use:**
- Email: test@example.com
- Password: password123

*(First-time setup only - create your own account)*

## 📝 Project Files Modified

✅ **Backend:**
- `src/controllers/authController.js` - Complete auth with user data
- `src/controllers/chatController.js` - Chat with AI integration
- `src/controllers/ideaController.js` - Add getAllIdeas, deleteIdea
- `src/routes/authRoutes.js` - Add /me endpoint
- `src/routes/ideaRoutes.js` - Add all routes
- `src/routes/chatRoutes.js` - Add history endpoints
- `.env` - Database and server config
- `docs/init-db.sql` - Complete schema

✅ **Frontend:**
- `src/context/AuthContext.jsx` - Real API auth
- `src/pages/dashboard/Dashboard.jsx` - Real API integration
- `src/utils/constants.js` - Fixed API base URL
- `.env` - API configuration

## 🎯 What Each Component Does

### Frontend
- **React App** - Renders UI at http://localhost:5173
- **Auth Context** - Manages login/logout state
- **Dashboard** - Shows generated startup plans
- **Chat** - AI co-founder conversations

### Backend
- **Express Server** - REST API at http://localhost:5000/api
- **Auth Controller** - JWT token validation
- **Idea Controller** - Plan generation and storage
- **Chat Controller** - Message handling

### Database
- **PostgreSQL** - Stores users, ideas, chat, teams
- **Tables** - 7 tables with proper relationships
- **Indexes** - For query optimization

## 📚 More Information

- Full Setup Guide: See `SETUP_AND_RUN.md`
- API Documentation: See `launchforge-backend/docs/api-spec.md`
- Project Structure: See `SETUP_AND_RUN.md` → Project Structure section

## ✨ Next Steps After Running

1. ✅ Create an account
2. ✅ Generate an idea plan
3. ✅ Chat with AI co-founder
4. ✅ Export pitch deck (coming soon)
5. ✅ Invite team members (coming soon)

---

**🎉 You're all set! Start building! 🚀**
