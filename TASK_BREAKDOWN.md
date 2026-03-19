# TruthBoard — Task Breakdown

> All tasks are ordered by development phase.
> Each task is designed to be completed in a single implementation session.

---

## Phase 1 — Foundation & Auth System

### Task 1.1: Refactor User Model & Auth System
- [x] Upgrade `User.js` model with new fields: `avatar`, `role`, `isVerified`, `bio`, `location`, `reviewCount`
- [x] Add role-based enum: `user`, `companyOwner`, `admin`
- [x] Update `authController.js` — add `getMe`, `updateProfile`, `changePassword`
- [x] Update `authRoutes.js` with new endpoints
- [x] Add input validation with `express-validator`
- [x] Add `roleMiddleware.js` for role-based access control

### Task 1.2: Security Hardening
- [x] Install and configure `helmet`, `express-rate-limit`, `express-mongo-sanitize`
- [x] Add rate limiting to auth routes (5 req/min for login)
- [x] Add global error handler middleware
- [x] Add request logger middleware (morgan)
- [x] Configure CORS properly for frontend origin

---

## Phase 2 — Company System

### Task 2.1: Category System
- [x] Create `Category.js` model
- [x] Create `categoryController.js` & `categoryRoutes.js`
- [x] Seed initial categories (Technology, Finance, Food, Health, Education, etc.)

### Task 2.2: Refactor Company Model
- [x] Upgrade `Company.js` with new fields: `logo`, `category` (ref), `claimedBy`, `isClaimed`, `contactEmail`, `averageRating`, `totalReviews`, `ratingDistribution`, `trustScore`
- [x] Add text index on `name` for search
- [x] Add compound indexes for sorting/filtering

### Task 2.3: Company Controller Expansion
- [x] Add company search endpoint with text search
- [x] Add get company by slug endpoint
- [x] Add get company by domain (includes real-time stat calculation)
- [x] Add category filtering endpoint
- [x] Add trending companies endpoint (sorted by review count + rating)
- [x] Add company claim endpoint
- [x] Add pagination to company listing (cursor-based)
- [x] Update seed script with new company fields

---

## Phase 3 — Review System

### Task 3.1: Refactor Review Model
- [x] Upgrade `Review.js` with new fields: `status`, `isEdited`, `editHistory`, `sentimentScore`, `isNegativeFlagged`, `isVerified`, `flagCount`
- [x] Add unique compound index `{ userId, companyId }` — one review per user per company
- [x] Add compound indexes for common query patterns

### Task 3.2: Review CRUD Enhancements
- [x] Update `reviewController.js` — add create review
- [x] Add edit review endpoint
- [x] Add delete review endpoint (hard delete for now)
- [x] Add single company reviews GET endpoint
- [x] Add user reviews endpoint (GET reviews by userId)
- [x] Add review sorting (newest, highest, lowest)
- [x] Add review filtering by rating
- [x] Add pagination

### Task 3.3: Rating Aggregation Logic
- [x] Create `ratingService.js` utility
- [x] Implement `recalculateCompanyRating()` — runs on review create/edit/delete
- [x] Updates: `averageRating`, `totalReviews`, `ratingDistribution`, `trustScore`
- [x] Trust score formula: Bayesian-weighted average favoring volume

### Task 3.4: Review Flagging System
- [x] Create `ReviewFlag.js` model
- [x] Create flag review endpoint (POST /api/reviews/:id/flag)
- [x] Increment `flagCount` on review
- [x] Validate one flag per user per review

---

## Phase 4 — Company Responses

### Task 4.1: Company Response System
- [ ] Create `CompanyResponse.js` model
- [ ] Create `responseController.js` & `responseRoutes.js`
- [ ] Validate only company owner can respond
- [ ] One response per review constraint
- [ ] Include response when fetching reviews (populate)

---

## Phase 5 — AI Negative Review Detection

### Task 5.1: Sentiment Analysis Service
- [ ] Create `sentimentService.js` in `server/services/`
- [ ] Build keyword dictionary for negative sentiment scoring
- [ ] Implement `analyze(text)` function → returns score 0–1
- [ ] Add unit tests for the sentiment scorer

### Task 5.2: Auto-Flagging Integration
- [ ] After review creation, run sentiment analysis
- [ ] If rating ≤ 2 AND sentimentScore ≥ 0.6 → set `isNegativeFlagged: true`
- [ ] Create notification for company owner
- [ ] Log the flagging event

---

## Phase 6 — Notification System

### Task 6.1: In-App Notifications
- [ ] Create `Notification.js` model
- [ ] Create `notificationController.js` & `notificationRoutes.js`
- [ ] Create `notificationService.js` — helper to create notifications
- [ ] Endpoints: get notifications, mark as read, mark all as read

### Task 6.2: Notification Triggers
- [ ] Trigger on: new review on claimed company
- [ ] Trigger on: negative review auto-flagged
- [ ] Trigger on: company responds to user's review
- [ ] Trigger on: review manually flagged (notify admin)
- [ ] Trigger on: review moderation result (notify author)

### Task 6.3: Email Notifications (Optional Enhancement)
- [ ] Setup Nodemailer / SendGrid integration
- [ ] Send email for high-priority notifications (negative reviews)
- [ ] Create email templates

---

## Phase 7 — Frontend: Core Pages Redesign

### Task 7.1: Design System & Layout
- [x] Create shared layout component with Navbar + Footer
- [x] Create reusable components: StarRating, ReviewCard, CompanyCard, SearchBar, Pagination, Toast/Alert
- [x] Setup global styles, color palette, typography in Tailwind config

### Task 7.2: Home Page
- [x] Hero section with search bar
- [x] Trending companies section
- [x] Category browsing tiles
- [x] Recent reviews feed
- [x] Responsive design

### Task 7.3: Company Search & Category Pages
- [ ] Search results page with filtering
- [ ] Category page with company cards
- [ ] Sort by: rating, review count, newest

### Task 7.4: Company Detail Page
- [x] Company header: logo, name, rating, trust score (real-time)
- [x] Reviews list with sorting/filtering
- [ ] Company response displayed under review
- [x] "Write a Review" CTA
- [x] Pagination for reviews

### Task 7.5: Review Pages
- [x] Write Review page with star selector, title, text
- [x] Edit Review page (pre-filled)
- [ ] Review detail page (single review + company response)

### Task 7.6: Auth Pages Redesign
- [x] Login page with modern UI
- [x] Register page with validation feedback
- [x] Phone OTP Login UI
- [ ] Forgot password page (placeholder)

---

## Phase 8 — Frontend: Dashboards

### Task 8.1: User Dashboard
- [x] User profile page — edit name, bio, location, avatar
- [x] User reviews list — all reviews by the logged-in user
- [x] Review edit/delete actions from dashboard

### Task 8.2: Company Owner Dashboard
- [ ] Company overview — stats: total reviews, avg rating, trust score
- [ ] Review management — all reviews with respond/flag actions
- [ ] Negative review alerts section (AI-flagged)
- [ ] Notification feed

### Task 8.3: Admin Panel
- [ ] User management — list, role change, ban
- [ ] Review moderation — flagged review queue, approve/reject
- [ ] Company management — add, edit, delete companies
- [ ] Platform stats — total users, reviews, companies, flagged count

---

## Phase 9 — Search & Discovery

### Task 9.1: Full-Text Search
- [ ] Backend: MongoDB text search on company name
- [ ] Frontend: search bar with live suggestions (debounced)
- [ ] Search results page with relevant sorting

### Task 9.2: Advanced Filtering
- [ ] Filter by category
- [ ] Filter by minimum rating
- [ ] Sort by: relevance, highest rated, most reviewed, newest

---

## Phase 10 — Security, Performance & QA

### Task 10.1: Performance Optimization
- [ ] Add `.lean()` to all read-only queries
- [ ] Add response compression middleware
- [ ] Frontend: lazy loading for pages (React.lazy + Suspense)
- [ ] Frontend: optimize re-renders with React.memo where needed

### Task 10.2: Final Security Audit
- [ ] Validate all inputs server-side
- [ ] Verify all protected routes check JWT
- [ ] Verify role-based access on admin/owner endpoints
- [ ] Test for common vulnerabilities (injection, XSS)

### Task 10.3: Final QA & Polish
- [ ] Cross-browser testing
- [ ] Responsive design verification (mobile, tablet, desktop)
- [ ] Error state handling on all pages
- [ ] Loading states on all async operations
- [ ] 404 page
