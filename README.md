# 🚀 EtharaAI Assignment (MERN Stack)

A full-stack MERN application built with **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.
The project demonstrates authentication, project/task management, and dashboard features with a modern UI.

---

## 🌐 Live Demo

* **Frontend (Vercel):** https://ethara-ai-assignment-one.vercel.app/
* **Backend (Railway):** https://etharaai-assignment-production-35d7.up.railway.app

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* CSS / Tailwind (if used)
* Axios / Fetch API

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Deployment

* Frontend → Vercel
* Backend → Railway

---

## 📁 Project Structure

```
ASSIGNMENT/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   └── package.json
│
└── .gitignore
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=https://etharaai-assignment-production-35d7.up.railway.app/api
```

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repository

```
git clone https://github.com/CodePandaAkhilesh/EtharaAI-Assignment.git
cd EtharaAI-Assignment
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
npm start
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Features

* User Authentication (JWT)
* Role-based access (if implemented)
* Project Management
* Task Management
* Dashboard APIs
* RESTful API structure
* Error handling middleware

---

## 🌍 Deployment Steps

### Backend (Railway)

1. Deploy from GitHub
2. Set root directory → `backend`
3. Add environment variables
4. Deploy and generate public URL

---

### Frontend (Vercel)

1. Import GitHub repo
2. Set root directory → `frontend`
3. Add environment variable:

   ```
   VITE_API_URL=<your-backend-url>/api
   ```
4. Deploy

---

## ⚠️ Important Notes

* Never commit `.env` files
* Rotate secrets if exposed
* Ensure CORS is configured properly in backend

---

## 📌 Future Improvements

* Add refresh tokens
* Improve UI/UX
* Add testing (Jest / Cypress)
* Add CI/CD pipeline
* Use role-based dashboards

---

## 👨‍💻 Author

**Akhilesh Verma**
GitHub: https://github.com/CodePandaAkhilesh

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
