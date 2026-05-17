<div align="center">

# 🧠 AI Notes Workspace

### Full-Stack AI-Powered Notes Application

Create, organize, search, and enhance your notes using AI.

</div>

---

## 🚀 Features

### 🔐 Authentication

✔ User Signup & Login  
✔ Secure Password Hashing  
✔ JWT-Based Authentication  
✔ Protected Routes  
✔ Persistent Login Sessions  

---

### 📝 Notes Workspace

✔ Create Notes  
✔ Edit Notes  
✔ Delete Notes  
✔ Auto-Save Functionality  
✔ Tags & Categories  
✔ Archive / Unarchive Notes  

---

### 🤖 AI Integration (Google Gemini)

✔ AI-Generated Summaries  
✔ Smart Title Suggestions  
✔ Action Items Extraction  

---

### 🔍 Search & Filtering

✔ Keyword-Based Search  
✔ Filter Notes By Tags  
✔ Sort By Last Updated  

---

### 🌐 Public Sharing

✔ Generate Public Share Links  
✔ View Shared Notes Without Login  
✔ Public / Private Access Control  

---

### 📊 Productivity Insights Dashboard

✔ Total Notes Count  
✔ Recently Edited Notes  
✔ Most Used Tags  
✔ AI Usage Statistics  
✔ Weekly Activity Summary  

---

# 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database | AI |
|----------|----------|-----------|----|
| React.js (Vite) | Node.js | MongoDB | Google Gemini API |
| Axios | Express.js | Mongoose | Gemini AI |
| React Router DOM | JWT Authentication |  |  |
| Context API | REST APIs |  |  |

</div>

---

# 📁 Project Structure

```bash
AI-NOTES-WORKSPACE/
│
├── client/                          # Frontend (React + Vite)
│   │
│   ├── public/                      # Static assets
│   │
│   ├── src/
│   │   ├── api/                     # API configuration & requests
│   │   ├── components/              # Reusable UI components
│   │   ├── context/                 # Context API state management
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── layouts/                 # Layout components
│   │   ├── pages/                   # Application pages
│   │   ├── routes/                  # Route handling & protected routes
│   │   ├── services/                # Business logic & API services
│   │   ├── utils/                   # Utility/helper functions
│   │   │
│   │   ├── App.jsx                  # Main App component
│   │   ├── App.css                  # Global App styles
│   │   ├── index.css                # Global CSS
│   │   └── main.jsx                 # React entry point
│   │
│   ├── .env.example                 # Frontend environment variables
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── server/                          # Backend (Node.js + Express)
│   │
│   ├── src/
│   │   ├── config/                  # Database & app configuration
│   │   ├── controllers/             # Request controllers
│   │   ├── middleware/              # Express middlewares
│   │   ├── models/                  # MongoDB/Mongoose models
│   │   ├── routes/                  # API routes
│   │   ├── services/                # Business logic services
│   │   ├── utils/                   # Utility/helper functions
│   │   ├── validators/              # Request validation schemas
│   │   └── server.js                # Express server entry point
│   │
│   ├── .env                         # Backend environment variables
│   ├── .env.example                 # Example environment variables
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
└── README.md

