# 🚀 LaunchForge AI – Backend API Documentation

Base URL:
http://localhost:5000

For deployed backend, replace with your cloud URL.

All protected routes require header:

Authorization: Bearer <JWT_TOKEN>

---

# 1️⃣ AUTH APIs

## POST /auth/register

Register a new user.

Request:
{
"email": "[user@test.com](mailto:user@test.com)",
"password": "123456"
}

Response:
{
"message": "User registered"
}

Errors:

* Email already exists
* Invalid input

---

## POST /auth/login

Login user.

Request:
{
"email": "[user@test.com](mailto:user@test.com)",
"password": "123456"
}

Response:
{
"token": "JWT_TOKEN"
}

---

# 2️⃣ IDEA APIs

## POST /idea/generate

Generate startup plan.

Headers:
Authorization: Bearer TOKEN

Request:
{
"idea": "AI fitness app for students"
}

Response:
{
"idea_id": "uuid",
"generated_plan": {
"problem": "...",
"target_users": ["..."],
"competitors": ["..."],
"mvp_features": ["..."],
"tech_stack": ["..."],
"roadmap_30_days": ["..."],
"idea_score": {
"market": 7,
"profit": 8,
"difficulty": 6,
"success_probability": 7
}
}
}

---

## GET /idea/:id

Get stored idea.

Headers:
Authorization: Bearer TOKEN

Response:
{
"id": "...",
"idea_text": "...",
"generated_plan": {...}
}

---

# 3️⃣ CHAT API

## POST /chat

Ask AI co-founder question.

Headers:
Authorization: Bearer TOKEN

Request:
{
"idea_id": "uuid",
"message": "How do I get first users?"
}

Response:
{
"response": "AI Co-Founder reply"
}

---

# 4️⃣ PITCH EXPORT

## POST /pitch/export

Export pitch deck PPT.

Headers:
Authorization: Bearer TOKEN

Request:
{
"idea_id": "uuid"
}

Response:
File download: pitch.pptx

---

# 5️⃣ TEAM APIs

## POST /team/create

Request:
{
"team_name": "LaunchForge Builders"
}

Response:
{
"message": "Team created",
"team_id": "uuid"
}

---

## POST /team/invite

Request:
{
"team_id": "uuid",
"user_email": "[friend@test.com](mailto:friend@test.com)"
}

Response:
{
"message": "Member invited"
}

---

## GET /team/:id

Response:
[
{
"team_name": "...",
"email": "...",
"role": "owner"
}
]

---

# 6️⃣ ERROR FORMAT

All errors return:

{
"success": false,
"message": "Error message"
}

---

# 7️⃣ FUTURE APIs

Planned endpoints:

GET /idea/:id/score
GET /idea/history
POST /ai/re-analyze

---

# ✅ Notes for Frontend Team

* Always store JWT token.
* Send token in Authorization header.
* Use idea_id for chat and pitch export.
* JSON structure will not change.

