# 🌐 JobSphere – MERN Stack Job Portal

JobSphere is a full-stack job portal application that connects job seekers with employers. It provides an intuitive and efficient interface for users to explore jobs, apply to opportunities, and manage applications — all in one place.

---

## 🚀 Live Demo

👉 [Live Site](https://job-portal-frontend-pp3k.vercel.app/)  
🔐 **Demo Credentials:**

- **Email:** demo@jobsphere.com  
- **Password:** demo12345

> Replace with real credentials or remove if not ready

---

## 🛠 Tech Stack

- **Frontend:** React.js, Redux Toolkit, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT, HTTP-Only Cookies
- **Deployment:** Vercel (Frontend), Render or Railway (Backend), MongoDB Atlas

---

## ✨ Features

### 👩‍💼 For Job Seekers
- 🔍 View job listings with search, filter, and pagination
- 💾 Save/bookmark jobs
- 📝 Apply to jobs
- 📄 View all applications in one place

### 🏢 For Employers *(Coming Soon)*
- ➕ Post jobs
- 📋 View applicants
- 🧑‍💼 Manage job listings

### 🔐 Auth & Security
- JWT-based login/signup
- Persistent session using HTTP-only cookies
- Role-based route protection

---

## 📸 Screenshots

<!-- Replace these with your real screenshots -->
| Home Page | Job Details | Applications |
|----------|--------------|--------------|
| ![Home](./public/home.png) | ![Details](./public/job-details.png) | ![Applications](./public/applications.png) |

---

## 📁 Project Structure

```bash
jobsphere/
├── client/         # Frontend - React
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   └── ...
│   └── public/
│
├── server/         # Backend - Express
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...


## 🧩 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/VikashMalav/Job-Portal-Frontend
git clone https://github.com/VikashMalav/Job-Portal-Backend
cd jobsphere

cd server
npm install

# Create .env file
touch .env

#Sample .env variables
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

#Start the backend:

npm run dev

#Frontend Setup (/client)
cd ../client
npm install
npm run dev

🌐 API Endpoints
#Auth
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile (requires token)

#Jobs
GET /api/jobs?page=1&limit=10

GET /api/jobs/:id

POST /api/jobs/apply/:id

🙌 Contributing
Contributions are welcome! Open an issue or submit a pull request.
Make sure to format your code with Prettier and follow the commit naming convention.

👨‍💻 Author
Made with ❤️ by Vikash Malav

Feel free to connect and share feedback!


---