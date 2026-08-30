📖 server/README.md
Create server/README.md:

markdown
# 🌐 OneWinq Core Backend API
> **Enterprise-Grade Modular Monolith for Digital Identity, Professional Networking, Communication & Multi-Tenant Organization Management.**
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Architecture](https://img.shields.io/badge/architecture-Modular%20Monolith-blue.svg)](https://martinfowler.com/bliki/MonolithFirst.html)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
---
## 🏛️ System Architecture
OneWinq Backend is built as a **Modular Monolith** in pure modern JavaScript (Node.js ES Modules). Each domain boundary is fully isolated into its own self-contained module (`model`, `service`, `controller`, `routes`, `validation`), allowing effortless transition into microservices in future phases if needed.
server/ ├── src/ │ ├── config/ # Typed Env (Zod), MongoDB Lifecycle & Pino Structured Logging │ ├── lib/ # AppError hierarchy, standardized response formatters, JWT │ ├── middleware/ # Auth, RBAC, Validate (Zod), RateLimiters, ErrorHandler, RequestLogger │ ├── utils/ # Pagination, Bcrypt Crypto, Slug generator, Profile Completion │ ├── modules/ # DOMAIN MODULES │ │ ├── auth/ # Dual Email/Phone OTP verification, Password Login, Token Rotation │ │ ├── users/ # User credentials & Platform Role RBAC │ │ ├── profiles/ # Digital Identity, Bio, Subsections (Exp/Edu/Skills), Completion Engine │ │ ├── cards/ # Digital Card customizer (Themes, Layouts, QR & vCard payloads) │ │ ├── connections/ # Networking state machine (Pending, Accepted, Rejected) │ │ ├── discovery/ # Public search, Multi-filter indexing & View Analytics │ │ ├── messages/ # Direct 1-on-1 conversations, unread counters, connection guards │ │ ├── engagement/ # Thoughts/Feed, Atomic Likes ($inc), Comments, Recommendations │ │ ├── dashboard/ # Single-roundtrip parallel aggregation engine │ │ └── organizations/ # Multi-Tenant B2B SaaS (Orgs, Depts, Teams, Scoped RBAC) │ ├── routes/ # Centralized /api/v1 router assembly │ ├── app.js # Express application pipeline │ └── server.js # Entry point with graceful shutdown

---
## ✨ Implemented Core Features (Phase 1)
| Domain | Key Capabilities |
| :--- | :--- |
| **Authentication & Security** | • Dual Email & Phone OTP verification (Registration & Password Reset)<br>• Password-only daily login (Bcrypt 12 rounds)<br>• Refresh Token Rotation with Replay Attack Detection & Device Fingerprinting<br>• Request tracing via `x-request-id` |
| **Digital Identity** | • Rich profile management with auto-calculated 0–100% completion engine<br>• Embedded sub-sections: Experience, Education, Skills, Achievements, Services, Social Links<br>• Auto-provisioning on user registration |
| **Digital Card** | • Server-driven customizable card themes (`DARK_LUXURY`, `MODERN`, `NEON_VIBRANT`, etc.)<br>• Layout toggle controls (show photo, headline, services, QR)<br>• Public shareable slug (`/api/v1/cards/:slug`) |
| **Networking** | • Strict canonical connection state machine (`PENDING` ➡️ `ACCEPTED` / `REJECTED` / `CANCELLED`)<br>• Prevents self-connections and duplicate requests<br>• Enforces relationship prerequisite for direct messaging |
| **Discovery & Analytics** | • Fast multi-field text search (`displayName`, `designation`, `skills`, `introduction`)<br>• Privacy protection (Never exposes `PRIVATE` profiles)<br>• Profile view tracking with 1-hour anti-spam deduplication & "Who Viewed My Profile" stats |
| **Communication** | • 1-on-1 Direct Messaging between accepted connections<br>• Real-time unread counts and read receipts (`readAt`)<br>• Reverse chronological paginated message history |
| **Engagement** | • Short-form Thoughts/Posts feed with tag indexing<br>• Atomic double-tap like toggles using MongoDB `$inc`<br>• Threaded comments and peer recommendations with owner moderation |
| **Unified Dashboard** | • Single fast aggregate payload (`/api/v1/dashboard/me`) gathering identity, card, connection counts, unread messages, and 7-day view metrics in parallel |
| **Enterprise SaaS** | • Multi-tenant organization hierarchy (Organizations ➡️ Departments ➡️ Teams)<br>• Scoped Org RBAC (`OWNER`, `ADMIN`, `MANAGER`, `MEMBER`, `GUEST`) |
---
## 📡 Complete API Reference (`/api/v1`)
### 🔑 Authentication (`/api/v1/auth`)
- `POST /send-verification` — Send 6-digit OTP (Email or Phone)
- `POST /verify-code` — Verify OTP standalone
- `POST /register` — Register account (Requires verified OTP)
- `POST /login` — Login with password (accepts `identifier`, `email`, or `phone`)
- `POST /refresh` — Rotate refresh token
- `POST /logout` — Revoke session
- `POST /reset-password` — Reset password via OTP
- `GET /me` — Get current authenticated user
### 👤 Profile & Digital Identity (`/api/v1/profiles`)
- `GET /me` — Get my profile
- `PATCH /me` — Update profile details (recalculates completion %)
- `PATCH /me/visibility` — Update visibility (`PUBLIC` | `PRIVATE` | `CONNECTIONS_ONLY`)
- `PATCH /me/template` — Update presentation template
- `POST /me/experience` | `DELETE /me/experience/:id` — Manage work experiences
- `POST /me/education` | `DELETE /me/education/:id` — Manage education
- `PUT /me/skills` — Update skills list
- `POST /me/achievements` | `DELETE /me/achievements/:id` — Manage achievements
- `POST /me/services` | `DELETE /me/services/:id` — Manage services
- `POST /me/social-links` | `DELETE /me/social-links/:id` — Manage social links
- `GET /:slug` — Public profile view
### 🪪 Digital Card (`/api/v1/cards`)
- `GET /me` — Get my digital card with populated profile
- `PATCH /me` — Customize theme, layout toggles, custom color
- `GET /:slug` — Public shareable digital card
### 🤝 Connections & Networking (`/api/v1/connections`)
- `GET /` — List my accepted connections (paginated with profiles)
- `GET /requests` — List incoming connection requests
- `GET /sent` — List sent pending requests
- `POST /:userId` — Send connection request
- `PATCH /:id/accept` — Accept connection request
- `PATCH /:id/reject` — Reject connection request
- `DELETE /:id` — Cancel request or remove connection
### 🔍 Discovery & Search (`/api/v1/discovery`)
- `GET /` — Discover public profiles feed
- `GET /search?q=...&skills=...` — Search by keyword, skills, designation, location
- `POST /views/:profileId` — Record profile view
- `GET /views/recent` — Get recently viewed profiles by me
- `GET /views/analytics` — "Who Viewed My Profile" analytics
### 💬 Messaging (`/api/v1/messages`)
- `GET /conversations` — Inbox conversations list with unread counters
- `GET /conversations/:id` — Message history in conversation (auto-marks as read)
- `POST /` — Send message to a connected user (finds/creates conversation)
- `POST /conversations/:conversationId/messages` — Reply to thread
- `PATCH /conversations/:id/read` — Mark conversation as read
### 🌟 Professional Engagement (`/api/v1/engagement`)
- `GET /thoughts/feed` — Public thoughts feed
- `POST /thoughts` — Publish thought / post
- `DELETE /thoughts/:id` — Delete thought
- `POST /thoughts/:id/like` — Toggle like on thought (atomic)
- `POST /thoughts/:thoughtId/comments` — Add comment
- `GET /thoughts/:thoughtId/comments` — List comments for thought
- `POST /reviews/profiles/:profileId` — Submit recommendation/review
- `GET /reviews/profiles/:profileId` — List approved recommendations
- `PATCH /reviews/:id/status` — Approve/reject recommendation
### 📊 Dashboard (`/api/v1/dashboard`)
- `GET /me` — Unified aggregate dashboard metrics
### 🏢 Enterprise Multi-Tenancy (`/api/v1/organizations`)
- `POST /` — Create organization (creator becomes `OWNER`)
- `GET /my` — List my organizations
- `GET /:id` — Get organization details & metrics
- `PATCH /:id` — Update organization (Owner/Admin)
- `POST /:id/departments` | `GET /:id/departments` — Manage departments
- `POST /:id/teams` — Create team
- `POST /:id/members` — Add/Invite member
- `GET /:id/members` — List organization members
- `PATCH /:id/members/:memberId/role` — Update member role
- `DELETE /:id/members/:memberId` — Remove member
---
## Quick Start Guide
### 1. Prerequisites
- **Node.js**: v20.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster connection
### 2. Installation
```bash
cd server
npm install
3. Environment Configuration
Create a .env file in the server/ root:

env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/onewinq_dev
JWT_ACCESS_SECRET=super_secret_access_jwt_key_at_least_32_characters_long_12345
JWT_REFRESH_SECRET=super_secret_refresh_jwt_key_at_least_32_characters_long_12345
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
4. Running Locally
bash
# Start development server with auto-reload
npm run dev
# Start production server
npm start
🔮 Future Scope & Roadmap (Phase 2 & 3)
Real-time Gateway (WebSockets / Socket.io):
Instant sub-50ms chat message delivery, typing indicators, and online presence badges.
Cloud Storage Engine (AWS S3 / Cloudinary):
Direct multipart uploads for Profile Avatars, Cover Photos, and Post media attachments with thumbnail resizing.
NFC & Digital Wallet Passes:
Apple Wallet (.pkpass) and Google Wallet pass generation for physical OneWinq NFC smart cards.
Subscription & Billing Engine (Stripe / Razorpay):
Automated seat licensing, enterprise billing tiers, and usage limits for organizations.
Distributed Caching (Redis):
Cache layer for public digital cards and feed discovery queries.