# TruthBoard — Project Structure

## Root Directory

```
truthboard/                         ← project root (currently "New folder")
│
├── client/                        ← React frontend (Vite)
├── server/                        ← Node.js + Express backend
│
├── IMPLEMENTATION_PLAN.md
├── TASK_BREAKDOWN.md
├── DATABASE_SCHEMA.md
├── FEATURE_ROADMAP.md
├── PROJECT_STRUCTURE.md
└── README.md
```

---

## Backend Structure

```
server/
│
├── config/
│   └── db.js                      # MongoDB connection
│
├── models/
│   ├── User.js                    # User schema
│   ├── Company.js                 # Company schema
│   ├── Review.js                  # Review schema
│   ├── Category.js                # Category schema
│   ├── CompanyResponse.js         # Company response to review
│   ├── ReviewFlag.js              # User-flagged reviews
│   └── Notification.js            # In-app notifications
│
├── controllers/
│   ├── authController.js          # Register, login, profile, password
│   ├── companyController.js       # CRUD, search, trending, claim
│   ├── reviewController.js        # CRUD, sort, filter, flag
│   ├── categoryController.js      # List, create categories
│   ├── responseController.js      # Company responses to reviews
│   ├── notificationController.js  # Get, mark read
│   └── adminController.js         # User mgmt, moderation, stats
│
├── routes/
│   ├── authRoutes.js
│   ├── companyRoutes.js
│   ├── reviewRoutes.js
│   ├── categoryRoutes.js
│   ├── responseRoutes.js
│   ├── notificationRoutes.js
│   └── adminRoutes.js
│
├── middleware/
│   ├── authMiddleware.js          # JWT verification (protect)
│   ├── roleMiddleware.js          # Role-based access (admin, companyOwner)
│   ├── errorMiddleware.js         # Global error handler
│   ├── rateLimiter.js             # Rate limiting config
│   └── validate.js                # Express-validator wrapper
│
├── services/
│   ├── ratingService.js           # Rating recalculation, trust score
│   ├── sentimentService.js        # AI negative review detection
│   ├── notificationService.js     # Create & dispatch notifications
│   └── emailService.js            # Email sending (Nodemailer)
│
├── utils/
│   ├── generateToken.js           # JWT token generation
│   ├── slugify.js                 # Company slug generation
│   └── asyncHandler.js            # Async error wrapper for controllers
│
├── seed.js                        # Database seed script
├── server.js                      # Express app entry point
├── .env                           # Environment variables
├── .env.example                   # Template for env vars
├── package.json
└── package-lock.json
```

---

## Frontend Structure

```
client/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── Footer.jsx         # Site footer
│   │   │   └── Layout.jsx         # Page wrapper (Navbar + Footer + Outlet)
│   │   │
│   │   ├── ui/
│   │   │   ├── StarRating.jsx     # Star display + interactive selector
│   │   │   ├── RatingBar.jsx      # Rating distribution bar chart
│   │   │   ├── SearchBar.jsx      # Search input with suggestions
│   │   │   ├── Pagination.jsx     # Pagination controls
│   │   │   ├── Toast.jsx          # Toast notification popup
│   │   │   ├── Spinner.jsx        # Loading spinner
│   │   │   ├── Modal.jsx          # Modal dialog
│   │   │   └── Badge.jsx          # Status / verified badges
│   │   │
│   │   ├── cards/
│   │   │   ├── CompanyCard.jsx    # Company card for listing/search
│   │   │   ├── ReviewCard.jsx     # Single review display
│   │   │   └── CategoryCard.jsx   # Category tile
│   │   │
│   │   └── forms/
│   │       ├── ReviewForm.jsx     # Write / edit review form
│   │       ├── LoginForm.jsx      # Login form
│   │       ├── RegisterForm.jsx   # Registration form
│   │       └── ProfileForm.jsx    # Edit profile form
│   │
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── SearchResults.jsx      # Search results listing
│   │   ├── CategoryPage.jsx       # Companies by category
│   │   ├── CompanyPage.jsx        # Company detail + reviews
│   │   ├── WriteReview.jsx        # Write a new review
│   │   ├── EditReview.jsx         # Edit existing review
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Register page
│   │   ├── UserProfile.jsx        # User public profile
│   │   ├── UserDashboard.jsx      # User's review management
│   │   ├── CompanyDashboard.jsx   # Company owner dashboard
│   │   ├── AdminPanel.jsx         # Admin panel (users, moderation, stats)
│   │   └── NotFound.jsx           # 404 page
│   │
│   ├── services/
│   │   └── api.js                 # Axios instance + interceptors
│   │
│   ├── context/
│   │   ├── AuthContext.jsx        # Auth state (user, login, logout)
│   │   └── NotificationContext.jsx # Notification state
│   │
│   ├── hooks/
│   │   ├── useAuth.js             # Auth context consumer hook
│   │   ├── useNotifications.js    # Notification fetch hook
│   │   └── useDebounce.js         # Debounce hook for search
│   │
│   ├── utils/
│   │   ├── formatDate.js          # Date formatting helpers
│   │   ├── constants.js           # App-wide constants
│   │   └── validators.js          # Client-side form validation
│   │
│   ├── App.jsx                    # Root component + Router
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind imports + base styles
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── package-lock.json
```

---

## Environment Variables

### server/.env
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<dbname>
JWT_SECRET=<strong-random-secret>
JWT_EXPIRE=30d

# Optional — Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=your-app-password

# Optional — Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### client/.env
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Key Architectural Decisions

| Decision                    | Choice              | Rationale                                    |
|-----------------------------|---------------------|----------------------------------------------|
| API style                   | REST                | Simpler for CRUD-heavy app, team familiarity |
| Auth                        | JWT (Bearer token)  | Stateless, scalable                          |
| DB ODM                      | Mongoose            | Rich schema validation, middleware hooks     |
| CSS framework               | TailwindCSS v4      | Utility-first, rapid UI development          |
| Bundler                     | Vite                | Fast HMR, modern ESM builds                 |
| State management            | React Context       | Sufficient for auth/notification state       |
| Pagination                  | Cursor-based        | Better performance for large datasets        |
| Rating storage              | Denormalized        | Avoids aggregation on every page load        |
| Sentiment analysis          | Local keyword-based | No external API dependency, fast execution   |
