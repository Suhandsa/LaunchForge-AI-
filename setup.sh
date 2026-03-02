#!/bin/bash

# LaunchForge AI - Complete Setup Script
# This script sets up the entire project (backend + frontend)

echo "================================================"
echo "🚀 LaunchForge AI - Project Setup"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env files exist
if [ ! -f "launchforge-backend/.env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found in backend${NC}"
    echo "    Copying from .env.example..."
    cp launchforge-backend/.env.example launchforge-backend/.env
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found in frontend${NC}"
    echo "    Copying from .env.example..."
    cp frontend/.env.example frontend/.env
fi

echo -e "${GREEN}✅ Environment files configured${NC}\n"

# Setup Backend
echo -e "${YELLOW}Setting up Backend...${NC}"
cd launchforge-backend

if [ ! -d "node_modules" ]; then
    echo "  Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Backend npm install failed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Backend dependencies already installed${NC}"
fi

cd ..

# Setup Frontend
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
    echo "  Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Frontend npm install failed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi

cd ..

echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${GREEN}================================================${NC}\n"

echo "📋 Next Steps:"
echo "  1. Make sure PostgreSQL is running on your system"
echo "  2. Create database: createdb launchforge_db"
echo "  3. Initialize schema: psql launchforge_db < launchforge-backend/docs/init-db.sql"
echo "  4. Start backend: npm run dev (from launchforge-backend)"
echo "  5. Start frontend: npm run dev (from frontend)"
echo ""
echo "Or use: npm run start:all (if you have concurrently installed globally)"
echo ""
