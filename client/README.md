# OneWinq Client

Frontend for the OneWinq professional networking platform — digital business cards, connections, discovery, messaging, engagement, and organizations.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [Available Scripts](#available-scripts)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Completed Modules](#completed-modules)
- [Complete API Reference](#complete-api-reference)
- [Authentication Flow](#authentication-flow)
- [Verified Flows](#verified-flows)

---

## Tech Stack

| Category | Technology |
|---|---|
| UI Framework | React 19 (JSX SPA) |
| Build Tool | Vite 8 |
| Routing | React Router 7 (protected/public guards) |
| HTTP Client | Axios (JWT auth + automatic token refresh) |
| Styling | Custom CSS design system (`src/styles/`) + Tailwind CSS 4 |
| Icons | lucide-react |
| Notifications | react-hot-toast |
| Charts | Pure CSS (no chart library) |

---

## Installation Guide

### Prerequisites

- **Node.js** 18+ (tested on v24)
- **npm** 9+
- Backend server running at `http://localhost:5000` (see `server/` folder) with MongoDB connected

### Step-by-step Setup

1. **Clone the repository and enter the client folder**

   ```bash
   git clone <repository-url>
   cd OneWinq/client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure the API URL** (optional)

   Create a `.env` file in `client/`:

   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

   If omitted, the client defaults to `http://localhost:5000/api/v1`.

4. **Start the backend** (in a separate terminal, from the repo root)

   ```bash
   cd server
   npm install
   npm run dev
   ```

5. **Start the frontend dev server**

   ```bash
   npm run dev
   ```

   The app runs at **http://localhost:3000**.

6. **Verify the setup**

   - Open http://localhost:3000 → redirects to `/login`
   - Sign up with an email → OTP verification completes the registration (in development the backend returns a `devOtp` and the UI offers an autofill button)
   - Login → lands on `/dashboard`

### Production Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## System Architecture

### High-level View

```
┌─────────────────────────┐         HTTPS / REST          ┌──────────────────────────┐
│   OneWinq Client (SPA)  │ ────────────────────────────▶ │  OneWinq Server          │
│   React 19 + Vite       │   JSON over Axios             │  Node.js + Express 5     │
│   localhost:3000        │ ◀──────────────────────────── │  Modular monolith        │
└─────────────────────────┘    Bearer JWT (access+refresh)│  /api/v1 (9 modules)     │
                                                            └────────────┬─────────────┘
                                                                         │ Mongoose
                                                                         ▼
                                                                   ┌───────────┐
                                                                   │  MongoDB  │
                                                                   └───────────┘
```

### Frontend Layered Architecture

```
┌────────────────────────────────────────────────────────────┐
│ Pages (25 routed pages)                                     │
│  auth · dashboard · profile · cards · connections ·         │
│  discovery · messages · engagement · organizations          │
├────────────────────────────────────────────────────────────┤
│ Layouts & Route Guards                                      │
│  AppShell (auth sidebar shell) · DashboardLayout ·          │
│  Protected / PublicOnly guards · CardProvider /             │
│  ConnectionProvider scopes                                  │
├────────────────────────────────────────────────────────────┤
│ Hooks (data fetching + state)                               │
│  useDashboard · useProfile · useDiscovery · useEngagement · │
│  useOrganizations · useConnections · useCards               │
├────────────────────────────────────────────────────────────┤
│ Contexts (global state)                                     │
│  AuthContext (user, session, logout) · CardContext ·        │
│  ConnectionContext                                          │
├────────────────────────────────────────────────────────────┤
│ Services (API layer)                                        │
│  authService · profileService · cardService ·               │
│  connectionService · dashboardService · discoveryService ·  │
│  engagementService · organizationService · messageService   │
├────────────────────────────────────────────────────────────┤
│ Axios instance (api.js)                                     │
│  baseURL from VITE_API_URL · Bearer token from              │
│  localStorage · auto 401 → /auth/refresh retry              │
│  (single-flight) · token cleanup on failure                 │
└────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

- **JWT dual-token auth** — short-lived access token + refresh token; the Axios interceptor transparently refreshes on 401 and retries the original request once.
- **Scoped contexts** — `CardContext` and `ConnectionContext` are mounted only on their route subtrees via pathless route wrappers, keeping state local.
- **Role-gated UI** — organization pages check `isOwner` / `isAdmin` / `canManageStructure` before exposing admin actions.
- **Public pages without auth** — `/cards/:slug` and `/profiles/:slug` render for unauthenticated visitors (share-link targets).
- **No chart library** — growth/analytics charts are pure CSS, keeping the bundle lean.

---

## Project Structure

```
src/
├── components/        # Reusable UI
│   ├── common/        #   Button, Input, Select, Empty, Loading
│   ├── layout/        #   AppShell (authenticated sidebar shell)
│   ├── auth/          #   AuthLayout (split-panel frame)
│   ├── cards/         #   CardForm, CardTemplate (5 themes), ShareCodes (QR+barcode)
│   ├── connections/   #   ConnectionCard, PendingRequests, UserSearchCard, ...
│   ├── dashboard/     #   DashboardLayout, Sidebar, Navbar, StatsCard, GrowthChart, ...
│   ├── discovery/     #   SearchBar, FilterPanel, CategoryFilter, UserResultCard, ...
│   ├── engagement/    #   EngagementStats, AnalyticsCard, ActivityCard, VisitorCard, ...
│   ├── organizations/ #   OrganizationCard, InviteMember, MembersList, RoleBadge, ...
│   └── profile/       #   ProfileForm, ProfilePreview, ProfileHeader, ...
├── context/           # AuthContext/AuthProvider, CardContext, ConnectionContext
├── hooks/             # useDashboard, useProfile, useDiscovery, useEngagement,
│                      # useOrganizations, useConnections, useCards
├── layouts/           # Layout shells
├── pages/             # 25 routed pages
│   ├── auth/          #   Login, Signup, VerifyOTP, ForgotPassword, ResetPassword
│   ├── dashboard/     #   Dashboard, ProfileDashboard, Settings
│   ├── profile/       #   Profile, EditProfile, PublicProfile
│   ├── cards/         #   Cards, CreateCard, EditCard, CardPreview
│   ├── connections/   #   Connections, ConnectionRequests, FindPeople, ConnectionProfile
│   ├── discovery/     #   Discovery, SearchResults, ExploreUsers, ExploreCards
│   ├── messages/      #   Messages (full messenger UI)
│   ├── engagement/    #   Engagement, Feed, Analytics, Activity, Visitors
│   └── organizations/ #   Organizations, CreateOrganization, OrganizationDetails,
│                      #   EditOrganization, Members, OrganizationSettings
├── routes/            # AppRoutes — Protected/PublicOnly guards, scoped providers
├── services/          # api.js (Axios instance) + per-module service files
├── styles/            # Custom CSS design system (app, profile, connections,
│                      # discovery, organizations, engagement)
└── utils/             # Helpers (share URL/QR utils, time formatting)
```

---

## Completed Modules

### Authentication
- Signup with email and/or phone, OTP verification (10-min TTL countdown, resend)
- Login / logout with JWT access + refresh token sessions
- Forgot/reset password via OTP
- Session restore on app boot via `/auth/me`
- Automatic silent token refresh on 401 (single-flight)
- Route guards: `Protected` and `PublicOnly`

### Dashboard
- Aggregated metrics: connections, pending requests, unread messages, profile views
- Growth chart, recent digital card with barcode, quick actions, organization snapshot
- Profile dashboard with completion ring and 10-point identity checklist
- Settings: visibility, template, contact details, card sharing, notification preferences

### Profiles
- Full profile editing: name, headline, about, contact, experience, education, skills, social links
- Profile preview and share codes (QR + barcode)
- Public profile page at `/profiles/:slug`

### Digital Card
- Card creation and editing with live preview
- 5 themes: Classic, Modern, Minimal, Dark Luxury, Neon Vibrant
- Layout options, display toggles, custom color, sharing toggle
- QR code + Code39 SVG barcode, copy share link
- Public shared card view at `/cards/:slug`

### Connections
- Connections list with client-side search and remove
- Incoming/sent requests: accept, reject, cancel
- Find people search with one-click connect
- Connection profile view with connect button

### Discovery
- Discover home with topic browsing and search
- Search results with filters: skills, designation, location, profile type
- Explore users with professional/personal category filter
- Profile view tracking and visitor analytics

### Messaging
- Full messenger UI: conversation inbox with unread badges, thread view, reply
- Start conversations restricted to existing connections
- REST-based integration with messages API

### Engagement
- Thoughts feed: post with tags/visibility, like toggle, comment threads, delete own posts
- Analytics dashboard with metric cards and top-thoughts chart
- Activity timeline and profile visitors analytics

### Organizations
- Organization creation and editing (role-gated to OWNER/ADMIN)
- Departments and teams management
- Member directory: invite, change role, remove, pagination
- Organization settings: self-join, custom branding, default card theme
- Client-side role gating (`isOwner` / `isAdmin` / `canManageStructure`)

---

## Complete API Reference

Base URL: `${VITE_API_URL}` (default `http://localhost:5000/api/v1`).
All protected routes require header `Authorization: Bearer <accessToken>`.

### Auth — `/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register with email/phone + password (requires verified code) |
| POST | `/auth/login` | No | Login, returns access + refresh tokens |
| POST | `/auth/refresh` | No | Exchange refresh token for a new access token |
| POST | `/auth/logout` | Yes | Revoke the refresh token session |
| POST | `/auth/send-verification` | No | Send OTP to email/phone (signup or password reset) |
| POST | `/auth/verify-code` | No | Verify an OTP code |
| POST | `/auth/reset-password` | No | Reset password using OTP |
| GET | `/auth/me` | Yes | Current user + session restore |

### Profiles — `/profiles`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/profiles/me` | Yes | Get own profile |
| PATCH | `/profiles/me` | Yes | Update profile fields |
| PATCH | `/profiles/me/visibility` | Yes | Update profile visibility |
| PATCH | `/profiles/me/template` | Yes | Update profile template |
| POST | `/profiles/me/experience` | Yes | Add experience entry |
| DELETE | `/profiles/me/experience/:id` | Yes | Remove experience entry |
| POST | `/profiles/me/education` | Yes | Add education entry |
| DELETE | `/profiles/me/education/:id` | Yes | Remove education entry |
| PUT | `/profiles/me/skills` | Yes | Replace skills list |
| POST | `/profiles/me/achievements` | Yes | Add achievement |
| DELETE | `/profiles/me/achievements/:id` | Yes | Remove achievement |
| POST | `/profiles/me/services` | Yes | Add service |
| DELETE | `/profiles/me/services/:id` | Yes | Remove service |
| POST | `/profiles/me/social-links` | Yes | Add social link |
| DELETE | `/profiles/me/social-links/:id` | Yes | Remove social link |
| GET | `/profiles/:slug` | No | Public profile lookup by slug |

### Cards — `/cards`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/cards/me` | Yes | Get own digital card |
| PATCH | `/cards/me` | Yes | Update card (theme, layout, toggles, sharing) |
| GET | `/cards/:slug` | No | Public shared card lookup |

### Connections — `/connections`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/connections` | Yes | List accepted connections |
| GET | `/connections/requests` | Yes | List incoming requests |
| GET | `/connections/sent` | Yes | List sent requests |
| POST | `/connections/:userId` | Yes | Send connection request |
| PATCH | `/connections/:id/accept` | Yes | Accept request |
| PATCH | `/connections/:id/reject` | Yes | Reject request |
| DELETE | `/connections/:id` | Yes | Remove connection / cancel request |

### Discovery — `/discovery`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/discovery` | Yes | Discover profiles (browse) |
| GET | `/discovery/search` | Yes | Search with q, skills, designation, location, profileType (rate-limited) |
| POST | `/discovery/views/:profileId` | No | Record a profile view (deduped) |
| GET | `/discovery/views/recent` | Yes | Recent profile visitors |
| GET | `/discovery/views/analytics` | Yes | Profile view analytics |

### Messages — `/messages`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/messages/conversations` | Yes | List conversations with unread counts |
| GET | `/messages/conversations/:id` | Yes | Get conversation messages |
| PATCH | `/messages/conversations/:id/read` | Yes | Mark conversation read |
| POST | `/messages` | Yes | Start a new conversation |
| POST | `/messages/conversations/:conversationId/messages` | Yes | Send a reply |

### Engagement — `/engagement`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/engagement/thoughts/feed` | No | Thoughts feed (paginated) |
| POST | `/engagement/thoughts` | Yes | Post a thought |
| DELETE | `/engagement/thoughts/:id` | Yes | Delete own thought |
| POST | `/engagement/thoughts/:id/like` | Yes | Toggle like |
| POST | `/engagement/thoughts/:thoughtId/comments` | Yes | Add comment |
| GET | `/engagement/thoughts/:thoughtId/comments` | Yes | List comments |
| POST | `/engagement/reviews/profiles/:profileId` | Yes | Submit profile review (service integrated, no UI yet) |
| GET | `/engagement/reviews/profiles/:profileId` | Yes | Get profile reviews |
| PATCH | `/engagement/reviews/:id/status` | Yes | Moderate review status |

### Dashboard — `/dashboard`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard/me` | Yes | Aggregated dashboard data (metrics, growth, recent card, org snapshot) |

### Organizations — `/organizations`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/organizations` | Yes | Create organization |
| GET | `/organizations/my` | Yes | List my memberships |
| GET | `/organizations/:id` | Yes | Get organization details |
| PATCH | `/organizations/:id` | OWNER/ADMIN | Update organization |
| POST | `/organizations/:id/departments` | OWNER/ADMIN/MANAGER | Add department |
| GET | `/organizations/:id/departments` | Yes | List departments |
| POST | `/organizations/:id/teams` | OWNER/ADMIN/MANAGER | Add team |
| POST | `/organizations/:id/members` | OWNER/ADMIN | Invite/add member |
| GET | `/organizations/:id/members` | Yes | List members (paginated) |
| PATCH | `/organizations/:id/members/:memberId/role` | OWNER/ADMIN | Change member role |
| DELETE | `/organizations/:id/members/:memberId` | OWNER/ADMIN | Remove member |

### Health (server root)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/ready` | Readiness check (DB connection) |

---

## Authentication Flow

```
Signup                              Login
──────                              ─────
POST /auth/send-verification        POST /auth/login
        │                                   │
        ▼                                   ▼
POST /auth/register                 access + refresh tokens
   (with OTP code)                          │
        │                                   ▼
        ▼                           stored in localStorage
GET /auth/me (session restore)      (onewinq_access_token)
                                            │
                                            ▼
On any API call                     401 → POST /auth/refresh
  Authorization: Bearer <access>      → retry original request once
                                      → logout + redirect on failure
```

- Access token is attached automatically by the Axios interceptor.
- Refresh is single-flight: concurrent 401s share one refresh request.
- Logout clears tokens locally and revokes the server-side session (`POST /auth/logout`).

---

## Verified Flows

- Signup → OTP verification → login golden path (dev OTP autofill supported)
- Forgot/reset password flow
- Protected-route redirects and session restore on app boot
- Token refresh recovery on expired access tokens
- Public card (`/cards/:slug`) and profile (`/profiles/:slug`) pages accessible unauthenticated
- Digital card create/edit/share with QR + barcode generation
- Connections lifecycle: send → accept/reject → remove
- Discovery search with filters, profile view tracking
- Messaging: start conversation, send/reply, unread badges
- Engagement: post/like/comment/delete thoughts, analytics, visitors
- Organizations: create, departments/teams, member invite/role/remove, settings
