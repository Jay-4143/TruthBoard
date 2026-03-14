# TruthBoard — Feature Roadmap

> Features listed in development priority order.
> Status: 🟢 Exists (basic) | 🟡 Planned | 🔴 Not Started

---

## Milestone 1 — Core Platform (MVP)

| #  | Feature                        | Status | Phase | Priority |
|----|--------------------------------|--------|-------|----------|
| 1  | User registration & login      | 🟢     | 1     | P0       |
| 2  | JWT authentication             | 🟢     | 1     | P0       |
| 3  | User profile management        | 🟡     | 1     | P0       |
| 4  | Role-based access control      | 🟡     | 1     | P0       |
| 5  | Company listing                | 🟢     | 2     | P0       |
| 6  | Company profile page           | 🟢     | 2     | P0       |
| 7  | Company categories             | 🟡     | 2     | P0       |
| 8  | Company search (text search)   | 🟡     | 2     | P0       |
| 9  | Write a review                 | 🟢     | 3     | P0       |
| 10 | Star rating (1–5)              | 🟢     | 3     | P0       |
| 11 | Edit / delete review           | 🟡     | 3     | P0       |
| 12 | Review sorting & filtering     | 🟡     | 3     | P1       |
| 13 | Review pagination              | 🟡     | 3     | P1       |

---

## Milestone 2 — Rating & Trust

| #  | Feature                           | Status | Phase | Priority |
|----|-----------------------------------|--------|-------|----------|
| 14 | Aggregate rating calculation      | 🟡     | 3     | P0       |
| 15 | Rating distribution bar (1–5)     | 🟡     | 3     | P0       |
| 16 | Weighted trust score              | 🟡     | 4     | P1       |
| 17 | Verified reviewer badge           | 🟡     | 4     | P1       |
| 18 | Review edit history tracking      | 🟡     | 3     | P2       |

---

## Milestone 3 — Company Interaction

| #  | Feature                           | Status | Phase | Priority |
|----|-----------------------------------|--------|-------|----------|
| 19 | Company claim profile             | 🟡     | 2     | P1       |
| 20 | Company respond to reviews        | 🟡     | 4     | P0       |
| 21 | Company analytics dashboard       | 🟡     | 8     | P1       |
| 22 | Trending companies algorithm      | 🟡     | 5     | P1       |

---

## Milestone 4 — AI & Moderation

| #  | Feature                                 | Status | Phase | Priority |
|----|-----------------------------------------|--------|-------|----------|
| 23 | AI negative review detection            | 🔴     | 5     | P0       |
| 24 | Auto-flag negative reviews              | 🔴     | 5     | P0       |
| 25 | Company notification for neg. reviews   | 🔴     | 6     | P0       |
| 26 | User-initiated review flagging          | 🟡     | 3     | P1       |
| 27 | Admin review moderation queue           | 🔴     | 8     | P1       |
| 28 | Spam/fraud keyword detection (prep)     | 🔴     | 5     | P2       |

---

## Milestone 5 — Notifications

| #  | Feature                           | Status | Phase | Priority |
|----|-----------------------------------|--------|-------|----------|
| 29 | In-app notification system        | 🔴     | 6     | P0       |
| 30 | New review notification           | 🔴     | 6     | P1       |
| 31 | Review response notification      | 🔴     | 6     | P1       |
| 32 | Negative review alert             | 🔴     | 6     | P0       |
| 33 | Email notifications (Nodemailer)  | 🔴     | 6     | P2       |

---

## Milestone 6 — Search & Discovery

| #  | Feature                           | Status | Phase | Priority |
|----|-----------------------------------|--------|-------|----------|
| 34 | Full-text company search          | 🟡     | 9     | P0       |
| 35 | Category browsing                 | 🟡     | 9     | P0       |
| 36 | Advanced filters (rating, sort)   | 🔴     | 9     | P1       |
| 37 | Search suggestions (live)         | 🔴     | 9     | P2       |

---

## Milestone 7 — Dashboards & Admin

| #  | Feature                           | Status | Phase | Priority |
|----|-----------------------------------|--------|-------|----------|
| 38 | User profile page                 | 🟡     | 8     | P0       |
| 39 | User reviews dashboard            | 🟡     | 8     | P0       |
| 40 | Company owner dashboard           | 🔴     | 8     | P0       |
| 41 | Admin panel — user management     | 🔴     | 8     | P1       |
| 42 | Admin panel — review moderation   | 🔴     | 8     | P1       |
| 43 | Admin panel — platform stats      | 🔴     | 8     | P2       |

---

## Milestone 8 — UI/UX Polish

| #  | Feature                           | Status | Phase | Priority |
|----|-----------------------------------|--------|-------|----------|
| 44 | Responsive design (all pages)     | 🟡     | 7     | P0       |
| 45 | Premium Tailwind design system    | 🟡     | 7     | P0       |
| 46 | Loading skeletons                 | 🔴     | 10    | P1       |
| 47 | Error boundary pages              | 🔴     | 10    | P1       |
| 48 | Toast notifications               | 🔴     | 7     | P1       |
| 49 | Micro-animations                  | 🔴     | 10    | P2       |

---

## Milestone 9 — Security & Performance

| #  | Feature                           | Status | Phase | Priority |
|----|-----------------------------------|--------|-------|----------|
| 50 | Rate limiting                     | 🟡     | 1     | P0       |
| 51 | Input validation (all endpoints)  | 🟡     | 1     | P0       |
| 52 | XSS / injection protection        | 🟡     | 10    | P0       |
| 53 | Lazy loading (React.lazy)         | 🔴     | 10    | P1       |
| 54 | Query optimization (.lean())      | 🔴     | 10    | P1       |
| 55 | Compression middleware            | 🔴     | 10    | P2       |
