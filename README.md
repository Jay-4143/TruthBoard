# TruthBoard — Transparency in Business Reviews

TruthBoard is a professional, MERN-stack transparency platform designed to build trust between customers and businesses through verified reviews and AI-driven insights. It provides a robust alternative to traditional review sites by focusing on authenticity and sentiment.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login system.
- **Company Listings**: Explore and search for companies by category or name.
- **Dynamic Reviews**: Write, edit, and filter reviews with star ratings (1–5).
- **Sentiment Analysis**: AI-powered detection of negative reviews for proactive moderation.
- **Verified Status**: Badges for verified reviewers to enhance platform trust.
- **Responsive Design**: Premium UI built with TailwindCSS, optimized for all devices.

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://reactjs.org/) (Vite), [TailwindCSS v4](https://tailwindcss.com/), [Axios](https://axios-http.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/), [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Validation**: [Express-validator](https://express-validator.github.io/)

## 📁 Project Structure

```text
truthboard/
├── client/          # Vite-powered React frontend
│   ├── src/         # Components, pages, hooks, and services
│   └── public/      # Static assets
└── server/          # Express backend
    ├── config/      # DB and service configurations
    ├── models/      # Mongoose schemas
    ├── routes/      # API endpoints
    └── controllers/ # Route logic
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/truthboard.git
   cd truthboard
   ```

2. **Setup the Backend**:
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   npm start
   ```

3. **Setup the Frontend**:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 🔐 Environment Variables

### Backend (`server/.env`)
- `PORT`: Port to run the server (e.g., 5000)
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong secret key for JWT
- `JWT_EXPIRE`: Token expiration time (e.g., 30d)

### Frontend (`client/.env`)
- `VITE_API_URL`: Backend API URL (e.g., http://localhost:5000/api)

## 🗺️ Roadmap

- [ ] Weighted Trust Score algorithm
- [ ] Company Response to reviews
- [ ] In-app and Email Notifications
- [ ] Advanced Moderation Queue
- [ ] Live Search Suggestions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
