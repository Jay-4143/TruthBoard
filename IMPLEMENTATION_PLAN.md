# TruthBoard — Full Implementation Plan

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                │
│  React Router → Pages → Components → Services (Axios)      │
│  AuthContext · ReviewContext · NotificationContext           │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API (JSON)
┌──────────────────────────▼──────────────────────────────────┐
│                    SERVER (Express.js)                       │
│  Middleware → Routes → Controllers → Services → Models      │
│  Auth · Rate-Limiter · Validator · ErrorHandler · Logger    │
├─────────────────────────────────────────────────────────────┤
│  AI Service Layer                                           │
│  • Sentiment analysis (negative review detection)           │
│  • Spam / fraud keyword scoring                             │
│  • Company notification trigger                             │
├─────────────────────────────────────────────────────────────┤
│  Notification Service                                       │
│  • In-app (DB-backed)                                       │
│  • Email (Nodemailer / SendGrid)                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│               MongoDB Atlas (Mongoose ODM)                  │
│  Users · Companies · Reviews · Categories                   │
│  Notifications · ReviewFlags · CompanyResponses             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Development Phases

| Phase | Name                          | Duration Est. |
|-------|-------------------------------|---------------|
| 1     | Foundation & Auth System      | ~2 sessions   |
| 2     | Company System                | ~2 sessions   |
| 3     | Review System                 | ~3 sessions   |
| 4     | Rating & Trust Logic          | ~2 sessions   |
| 5     | Search & Discovery            | ~2 sessions   |
| 6     | AI Negative Review Detection  | ~2 sessions   |
| 7     | Notification System           | ~1 session    |
| 8     | Company Dashboard             | ~2 sessions   |
| 9     | User Dashboard                | ~1 session    |
| 10    | Admin Panel                   | ~2 sessions   |
| 11    | UI Polish & Responsive Design | ~2 sessions   |
| 12    | Security, Performance & QA    | ~2 sessions   |

---

## 3. Backend API Design

### 3.1 Auth Endpoints
| Method | Endpoint               | Access  | Description              |
|--------|------------------------|---------|--------------------------|
| POST   | /api/auth/register     | Public  | Register new user        |
| POST   | /api/auth/login        | Public  | Login, return JWT        |
| GET    | /api/auth/me           | Private | Get current user profile |
| PUT    | /api/auth/profile      | Private | Update user profile      |
| PUT    | /api/auth/password     | Private | Change password          |

### 3.2 Company Endpoints
| Method | Endpoint                      | Access        | Description                    |
|--------|-------------------------------|---------------|--------------------------------|
| GET    | /api/companies                | Public        | List companies (paginated)     |
| GET    | /api/companies/:slug          | Public        | Get single company by slug     |
| POST   | /api/companies                | Admin         | Create company                 |
| PUT    | /api/companies/:id            | Admin/Owner   | Update company                 |
| DELETE | /api/companies/:id            | Admin         | Delete company                 |
| GET    | /api/companies/search?q=      | Public        | Search companies               |
| GET    | /api/companies/category/:cat  | Public        | Filter by category             |
| GET    | /api/companies/trending       | Public        | Get trending companies         |
| POST   | /api/companies/:id/claim      | Private       | Claim a company profile        |

### 3.3 Review Endpoints
| Method | Endpoint                           | Access  | Description                    |
|--------|------------------------------------|---------|--------------------------------|
| POST   | /api/reviews                       | Private | Create review                  |
| GET    | /api/reviews/company/:companyId    | Public  | Get reviews for a company      |
| GET    | /api/reviews/user/:userId          | Public  | Get reviews by a user          |
| PUT    | /api/reviews/:id                   | Private | Edit own review                |
| DELETE | /api/reviews/:id                   | Private | Delete own review              |
| POST   | /api/reviews/:id/flag              | Private | Flag a review                  |
| GET    | /api/reviews/:id                   | Public  | Get single review              |

### 3.4 Company Response Endpoints
| Method | Endpoint                              | Access       | Description               |
|--------|---------------------------------------|--------------|---------------------------|
| POST   | /api/responses/review/:reviewId       | CompanyOwner | Respond to a review       |
| PUT    | /api/responses/:id                    | CompanyOwner | Edit response             |
| DELETE | /api/responses/:id                    | CompanyOwner | Delete response           |

### 3.5 Category Endpoints
| Method | Endpoint              | Access | Description          |
|--------|-----------------------|--------|----------------------|
| GET    | /api/categories       | Public | List all categories  |
| POST   | /api/categories       | Admin  | Create category      |

### 3.6 Notification Endpoints
| Method | Endpoint                     | Access  | Description                |
|--------|------------------------------|---------|----------------------------|
| GET    | /api/notifications           | Private | Get user notifications     |
| PUT    | /api/notifications/:id/read  | Private | Mark notification as read  |
| PUT    | /api/notifications/read-all  | Private | Mark all as read           |

### 3.7 Admin Endpoints
| Method | Endpoint                       | Access | Description                 |
|--------|--------------------------------|--------|-----------------------------|
| GET    | /api/admin/reviews/flagged     | Admin  | Get flagged reviews         |
| PUT    | /api/admin/reviews/:id/approve | Admin  | Approve/reject flagged      |
| GET    | /api/admin/users               | Admin  | List all users              |
| PUT    | /api/admin/users/:id/role      | Admin  | Change user role            |
| GET    | /api/admin/stats               | Admin  | Platform statistics         |

---

## 4. Security Considerations

- **Authentication**: JWT tokens with expiration; refresh token rotation
- **Password**: bcrypt hashing with salt rounds (12)
- **Rate Limiting**: express-rate-limit on auth and review endpoints
- **Input Validation**: express-validator on all POST/PUT routes
- **XSS Protection**: helmet middleware, DOMPurify on frontend
- **CORS**: Whitelist specific origins in production
- **MongoDB Injection**: Mongoose schema validation + mongo-sanitize
- **File Upload**: Limit size, validate MIME types (if avatars added)
- **Environment**: All secrets in `.env`, never committed

---

## 5. Scalability Considerations

- **Database Indexing**: Compound indexes on frequently queried fields (see DATABASE_SCHEMA.md)
- **Pagination**: Cursor-based pagination for reviews and companies
- **Caching**: Response caching for company profiles and aggregate ratings
- **Background Jobs**: Sentiment analysis runs asynchronously after review creation
- **Lean Queries**: `.lean()` for read-only Mongoose queries
- **Connection Pooling**: Mongoose default pool with `maxPoolSize` set appropriately

---

## 6. AI Negative Review Detection System

### How It Works
1. **Trigger**: After a review is created, a post-save middleware fires.
2. **Rating Check**: If rating ≤ 2 stars → flag for analysis.
3. **Sentiment Analysis**: A lightweight keyword-based sentiment scorer runs on the review text.
   - Uses a curated dictionary of negative keywords/phrases.
   - Produces a negativity score (0–1).
   - Threshold ≥ 0.6 → flagged as negative.
4. **Flagging**: The review is marked with `sentimentScore` and `isNegativeFlagged: true` in the database.
5. **Notification**: A notification document is created for the company owner and (optionally) an email is sent via Nodemailer.
6. **Company Dashboard**: The company owner sees flagged negative reviews in a priority section with a "Respond" action.

### Architecture
```
Review Created (POST /api/reviews)
       │
       ▼
reviewController.createReview()
       │
       ▼
sentimentService.analyze(reviewText)  ← keyword dictionary scoring
       │
       ├── score < 0.6 → normal review flow
       │
       └── score ≥ 0.6 AND rating ≤ 2
              │
              ▼
        Flag review (isNegativeFlagged: true)
              │
              ▼
        Create Notification for company owner
              │
              ▼
        (Optional) Send email via emailService
```

---

## 7. Review Moderation Design

- **User-initiated**: Any logged-in user can flag a review with a reason.
- **AI-initiated**: Negative sentiment + low rating auto-flags.
- **Admin queue**: Flagged reviews appear in admin panel for manual review.
- **States**: `pending` → `approved` / `rejected` / `removed`.
- **Company responses**: Company owners can respond publicly to any review.

---

## 8. Notification System Planning

| Trigger                       | Recipient      | Channel       |
|-------------------------------|----------------|---------------|
| Negative review detected      | Company owner  | In-app + Email|
| Review on your company        | Company owner  | In-app        |
| Company responds to review    | Review author  | In-app        |
| Review flagged by user        | Admin          | In-app        |
| Review approved/rejected      | Review author  | In-app        |

---

## 9. Verification Plan

### Automated Testing
- **Backend unit tests**: Jest + Supertest for all API endpoints
  - Auth flow: register → login → token verification
  - CRUD on companies and reviews
  - Sentiment service scoring validation
  - Middleware authorization checks
- **Run**: `cd server && npm test`

### Browser Testing
- Verify all page routes render without errors
- Test review submission flow end-to-end
- Test login/register forms with validation

### Manual Testing
1. Register a new user → login → verify JWT in localStorage
2. Browse companies on home page → click into a company → see reviews
3. Submit a 1-star review with negative text → verify it auto-flags
4. Log in as company owner → see notification for flagged review
5. Respond to the review → verify response appears publicly
