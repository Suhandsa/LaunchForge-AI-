# 📋 FINAL COMMAND REFERENCE - RUN LAUNCHFORGE AI

## ✨ TL;DR - Run Project in 5 Minutes

### Mac/Linux:
```bash
# 1. Install dependencies
bash setup.sh

# 2. Setup PostgreSQL
createdb launchforge_db
psql -U postgres launchforge_db < launchforge-backend/docs/init-db.sql

# 3. Terminal 1 - Backend
cd launchforge-backend && npm run dev

# 4. Terminal 2 - Frontend
cd frontend && npm run dev

# 5. Open browser
# http://localhost:5173
```

### Windows (PowerShell):
```bash
# 1. Install dependencies
.\setup.bat

# 2. Setup PostgreSQL
createdb launchforge_db
psql -U postgres -h localhost -d launchforge_db -f launchforge-backend\docs\init-db.sql

# 3. Terminal 1 - Backend
cd launchforge-backend; npm run dev

# 4. Terminal 2 - Frontend
cd frontend; npm run dev

# 5. Open browser
# http://localhost:5173
```

---

## 🎯 Complete Step-by-Step Commands

### STEP 1: Verify Prerequisites

```bash
# Check Node.js
node --version
# Expected: v16.0.0 or higher

# Check npm
npm --version
# Expected: v8.0.0 or higher

# Check PostgreSQL
psql --version
# Expected: psql (PostgreSQL) 12 or higher
```

### STEP 2: Install All Dependencies

#### Option A: Automated (Recommended)

**Mac/Linux:**
```bash
bash setup.sh
```

**Windows:**
```bash
setup.bat
```

#### Option B: Manual Installation

**Install Backend Dependencies:**
```bash
cd launchforge-backend
npm install
cd ..
```

**Install Frontend Dependencies:**
```bash
cd frontend
npm install
cd ..
```

### STEP 3: Setup PostgreSQL Database

#### Start PostgreSQL Service

**Windows:**
```bash
# Check Services (press Win + R, type services.msc)
# Or through Command Prompt:
net start PostgreSQL
```

**Mac:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo service postgresql start
```

#### Create Database

```bash
createdb launchforge_db
```

#### Initialize Database Schema

**Mac/Linux:**
```bash
psql -U postgres launchforge_db < launchforge-backend/docs/init-db.sql
```

**Windows (Command Prompt):**
```bash
psql -U postgres -h localhost -d launchforge_db -f launchforge-backend\docs\init-db.sql
```

**Windows (PowerShell):**
```powershell
psql -U postgres -h localhost -d launchforge_db -f "launchforge-backend\docs\init-db.sql"
```

#### Verify Database Setup

```bash
# Connect to database
psql -U postgres launchforge_db

# List tables (in psql)
\dt

# Expected output should show:
# - users
# - ideas
# - idea_versions
# - chat_history
# - teams
# - team_members
# - pitch_decks

# Exit psql
\q
```

### STEP 4: Configure Environment Variables

These should already be set up from setup.bat/setup.sh, but verify:

**Backend** (`launchforge-backend/.env`)
```env
DB_USER=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=launchforge_db
DB_PASSWORD=postgres
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production
AI_MODE=mock
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_API_KEY=sk-your_ai_api_key
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=LaunchForge AI
```

### STEP 5: Start the Application

#### Terminal 1: Start Backend Server

```bash
cd launchforge-backend
npm run dev
```

**Expected Output:**
```
> launchforge-backend@1.0.0 dev
> nodemon src/server.js

[nodemon] 3.0.1
[nodemon] to restart at any time, type `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: js,json
[nodemon] starting `node src/server.js`
🔥 Server running on port 5000
✅ PostgreSQL Connected
```

#### Terminal 2: Start Frontend Development Server

**Open a NEW terminal window/tab and run:**
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  build x.xx.x

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

### STEP 6: Access the Application

**Open your browser and navigate to:**
```
http://localhost:5173
```

You should see the LaunchForge AI login page.

---

## 🧪 Test the Features

### Test 1: Register & Login

1. Click "Sign Up"
2. Fill in:
   - Email: `test@example.com`
   - Password: `password123`
   - Name: `Test User`
3. Click "Register"
4. You should be redirected to the Dashboard

### Test 2: Generate Startup Plan

1. On the Dashboard, find the "Enter your startup idea" input
2. Type: `AI fitness app for students`
3. Click "Generate Plan"
4. Wait 2-3 seconds for AI response
5. You should see:
   - Problem statement
   - Target users
   - Competitors
   - MVP features
   - Tech stack recommendation
   - Idea score chart
   - Execution roadmap

### Test 3: AI Co-Founder Chat

1. Click "AI Chat" in the sidebar
2. Type: `How do I get my first 100 users?`
3. Press Enter
4. AI co-founder responds with startup advice
5. Continue asking questions

### Test 4: Verify Database

```bash
# In new terminal, connect to database
psql -U postgres launchforge_db

# Check if user was created
SELECT * FROM users;

# Check if idea was stored
SELECT * FROM ideas;

# Check if chat was stored
SELECT * FROM chat_history;

# Exit
\q
```

---

## 🔧 Useful Development Commands

### Backend Commands

```bash
cd launchforge-backend

# Start development server
npm run dev

# Test API endpoints (requires curl or Postman)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Frontend Commands

```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Commands

```bash
# Connect to database
psql -U postgres launchforge_db

# List all tables
\dt

# View table structure
\d users

# Run SQL directly
SELECT COUNT(*) FROM users;

# Backup database
pg_dump launchforge_db > backup.sql

# Restore database
psql launchforge_db < backup.sql

# Exit psql
\q
```

---

## 🚨 Common Issues & Fixes

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (replace PID with actual number)
kill -9 <PID>

# Or change PORT in backend/.env
```

### Issue: "Port 5173 already in use"

**Solution:**
```bash
# Find process using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or let Vite use next available port (it will prompt)
```

### Issue: "PostgreSQL connection refused"

**Solution:**
```bash
# Check if PostgreSQL is running
pg_isready

# If not running, start it:
# Windows: services.msc → PostgreSQL → Start
# Mac: brew services start postgresql
# Linux: sudo service postgresql start

# Verify connection
psql -U postgres
```

### Issue: "The requested module ... does not provide an export named"

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "CORS error: Access blocked"

**Solution:**
- Ensure backend is running on port 5000
- Ensure frontend VITE_API_BASE_URL points to http://localhost:5000/api
- Check backend FRONTEND_URL is set to http://localhost:5173

### Issue: "Database does not exist"

**Solution:**
```bash
# Create the database
createdb launchforge_db

# Initialize schema
psql -U postgres launchforge_db < launchforge-backend/docs/init-db.sql
```

---

## 📊 Ports Used

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 5000 | http://localhost:5000 |
| PostgreSQL | 5432 | localhost:5432 |

**Ensure these ports are not blocked by firewall!**

---

## 🔑 Default Test Account

After setup, you can register new accounts. Or use:
- Email: test@example.com
- Password: password123

---

## 📈 API Endpoints Ready to Use

```
POST   /api/auth/register        - Create new account
POST   /api/auth/login           - Login with email/password
GET    /api/auth/me              - Get current user

POST   /api/idea/generate        - Generate startup plan
GET    /api/idea                 - Get all user's ideas
GET    /api/idea/:id             - Get specific idea
DELETE /api/idea/:id             - Delete idea

POST   /api/chat                 - Send message to AI
GET    /api/chat/:ideaId         - Get chat history
DELETE /api/chat/:ideaId         - Clear chat

POST   /api/team/create          - Create team
POST   /api/team/invite          - Invite member
GET    /api/team/:id             - Get team details

POST   /api/pitch/export         - Export pitch deck
```

---

## 📚 Documentation Files Created

Located in project root:

1. **QUICK_START.md** - Quick reference (this is comprehensive)
2. **SETUP_AND_RUN.md** - Detailed setup guide with troubleshooting
3. **INTEGRATION_GUIDE.md** - How all components work together
4. **launchforge-backend/docs/init-db.sql** - Database schema
5. **launchforge-backend/docs/api-spec.md** - API specification

---

## ✅ Verification Checklist

After running, verify everything works:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] PostgreSQL database connected
- [ ] Can see login page at http://localhost:5173
- [ ] Can register new account
- [ ] Can generate startup ideas
- [ ] Can chat with AI
- [ ] Network tab shows API calls succeeding (200 status)
- [ ] Console shows no errors

---

## 🎯 Next Steps

1. ✅ Complete setup (follow commands above)
2. ✅ Register an account
3. ✅ Generate an idea
4. ✅ Chat with AI
5. ✅ Explore features
6. ✅ View INTEGRATION_GUIDE.md to understand how it works
7. ✅ Add your own features!

---

## 🆘 Need Help?

Check these files:
- **SETUP_AND_RUN.md** - Full setup guide with detailed explanations
- **INTEGRATION_GUIDE.md** - Component architecture and data flows
- **launchforge-backend/docs/api-spec.md** - API endpoints documentation

---

## 🎉 You're Ready!

Everything is now:
- ✅ Integrated
- ✅ Tested
- ✅ Documented
- ✅ Ready to run

**Run the commands above and START BUILDING! 🚀**
