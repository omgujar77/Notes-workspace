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
```
# ⚙️ Installation Guide

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/omgujar77/Notes-workspace.git

cd ai-notes-workspace
```

---

## 2️⃣ Backend Setup

```bash
cd server

npm install
```

### Create `.env` File Inside `server/`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key

CLIENT_URL=http://localhost:5173
```

### Run Backend Server

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd client

npm install
```

### Create `.env` File Inside `client/`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Run Frontend

```bash
npm run dev
```

---

# ▶️ Run Application

<div align="center">

| Service | URL |
|----------|------|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

</div>

---

# 🧪 Testing

## 🔐 Authentication

- ✔ Create Account
- ✔ Login
- ✔ Verify Protected Routes

---

## 📝 Notes

- ✔ Create Notes
- ✔ Edit Notes
- ✔ Add Tags
- ✔ Test Auto-Save

---

## 🤖 AI Features

- ✔ Generate Summary
- ✔ Generate Smart Title
- ✔ Extract Action Items

---

## 🌐 Public Sharing

- ✔ Make Notes Public
- ✔ Copy Share Link
- ✔ Open In Incognito Mode

---

## 🔍 Search & Filtering

- ✔ Search Notes By Keywords
- ✔ Filter Notes Using Tags

---

## 📊 Dashboard

- ✔ Check Note Statistics
- ✔ View Activity Summary
- ✔ Most Used Tags
- ✔ AI Usage Data

---

# 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Connection String |
| `JWT_SECRET` | JWT Secret Key |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `VITE_API_BASE_URL` | Backend API URL |

---

# 📌 Future Improvements

- ✨ Real-Time Collaboration
- ✨ Rich Text Editor (Markdown Support)
- ✨ Mobile Application
- ✨ Advanced Analytics Dashboard
- ✨ Folder-Based Organization
- ✨ AI-Powered Categorization

---

# 👨‍💻 Author

<div align="center">

## Om Gujar

</div>

---

# 📜 License

This project is licensed under the **MIT License**.
