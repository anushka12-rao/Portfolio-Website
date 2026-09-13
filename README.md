# Portfolio CMS (`portfolio-cms`)

A production-grade, full-stack developer portfolio and Content Management System (CMS) engineered with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, **Node.js/Express**, and **MongoDB/Mongoose**.

Featuring **HttpOnly cookie-based session authentication**, server-side role authorization, Zod schema validation, rate-limiting, Helmet security headers, manual ordering, and a draft/publish lifecycle.

---

## Architecture & Stack

- **Frontend**:
  - React 18 & Vite (fast HMR and optimized production bundling)
  - Tailwind CSS (responsive dark-mode theme)
  - Framer Motion & Lucide React (animations and iconography)
  - React Router DOM v6 (public and admin protected route layouts)
  - Axios client with `withCredentials: true` (HttpOnly cookie forwarding)
- **Backend**:
  - Node.js & Express.js (REST API architecture)
  - MongoDB & Mongoose (data modeling, indexing, and validation)
  - `express-session` + `connect-mongo` (HttpOnly, SameSite, server-managed sessions)
  - `bcryptjs` (secure password hashing)
  - `zod` (runtime schema validation across all write endpoints)
  - `helmet`, `express-rate-limit`, and locked CORS allow-list
  - `multer` + Cloudinary SDK (with local disk storage fallback)

---

## Monorepo Layout

```
portfolio-cms/
├── package.json                         # Root monorepo orchestration scripts
├── .gitignore                           # Git ignore rules
├── README.md                            # Comprehensive system documentation
├── backend/
│   ├── .env.example                     # Environment template
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── database.js              # Mongoose connection & lifecycle
│       │   ├── environment.js           # Env config & defaults
│       │   └── cloudinary.js            # Cloudinary & disk fallback storage
│       ├── models/
│       │   ├── User.js                  # Admin user model
│       │   ├── Project.js               # Project showcase model
│       │   ├── Technology.js            # Tech stack skill model
│       │   ├── Achievement.js           # Credential & award model
│       │   ├── Message.js               # Inquiries model
│       │   └── Profile.js               # Portfolio owner profile model
│       ├── controllers/                 # REST controllers (auth, project, tech, etc.)
│       ├── routes/                      # Express route definitions
│       ├── middleware/                  # Auth, Admin guard, Zod validate, Rate limiter
│       ├── services/                    # Business logic & image service
│       ├── validators/                  # Zod validation schemas
│       ├── utils/                       # Cookies, logger, sanitization
│       ├── scripts/
│       │   └── seed.js                  # Database seeder (Admin + sample content)
│       ├── tests/                       # Supertest API & security test suite
│       ├── app.js                       # Express app configuration
│       └── server.js                    # Server bootstrap
└── frontend/
    ├── .env.example                     # Client environment template
    ├── package.json
    ├── vite.config.js                   # Vite configuration
    ├── tailwind.config.js               # Tailwind styling configuration
    ├── index.html
    └── src/
        ├── components/                  # UI components (cards, navbar, footer, form)
        ├── pages/public/                # Public portfolio pages (Home, About, Projects, etc.)
        ├── pages/admin/                 # Admin CMS pages (Dashboard, Projects, Messages, etc.)
        ├── layouts/                     # PublicLayout and AdminLayout
        ├── routes/                      # AppRoutes, ProtectedRoute, PublicRoute
        ├── services/                    # API client and resource services
        ├── context/                     # AuthContext for session management
        ├── hooks/                       # Custom React hooks (useAuth, useProjects)
        └── utils/                       # Mock data & helpers
```

---

## Prerequisites

- **Node.js** >= 18.0.0 (Tested on Node v20.18.0)
- **npm** >= 9.0.0
- **MongoDB** (Local instance or MongoDB Atlas cluster connection URI)

---

## Quick Start Guide

### 1. Clone & Install Dependencies

From the repository root:

```bash
# Install root, backend, and frontend dependencies
npm run install:all
```

Or install individually:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure Environment Variables

Create `.env` files from their respective examples:

#### Backend (`backend/.env`):

```bash
cp backend/.env.example backend/.env
```

Review and adjust `backend/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Connection String (Local or MongoDB Atlas)
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio-cms

# Session Secret (Use a random 32+ character string in production)
SESSION_SECRET=portfolio_super_secure_session_secret_key_random_32_chars

# Admin Seeder Defaults
ADMIN_EMAIL=admin@portfolio.local
ADMIN_PASSWORD=Admin@123456

# Cloudinary (Optional: leaves empty to use local storage fallback in backend/uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### Frontend (`frontend/.env`):

```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database & Admin User

Run the seeder script to initialize the admin user and sample portfolio data:

```bash
npm run seed
```

This creates:
- **Admin Account**: `admin@portfolio.local` (Password: `Admin@123456`)
- Initial portfolio profile, projects (including draft items), tech stack, and achievements.

### 4. Run Development Servers

Run both the Express API and Vite React frontend concurrently:

```bash
npm run dev
```

- **Public Website**: [http://localhost:5173](http://localhost:5173)
- **Admin CMS**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## API Specification

### Public Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check and server status |
| `GET` | `/api/projects` | List all published projects (sorted by `order`) |
| `GET` | `/api/projects/:slug` | Retrieve single published project by slug |
| `GET` | `/api/technologies` | List all visible technologies |
| `GET` | `/api/achievements` | List all visible achievements |
| `GET` | `/api/profile` | Retrieve public developer bio & social profile |
| `POST` | `/api/messages` | Submit contact message (Rate-limited, Zod-validated) |

### Authentication Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate admin & issue HttpOnly session cookie |
| `POST` | `/api/auth/logout` | Invalidate session and clear session cookie |
| `GET` | `/api/auth/me` | Return current authenticated user profile |

### Admin Management Endpoints (All require `authenticate` + `authorizeAdmin`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/dashboard/stats` | Counters for projects, drafts, tech, messages |
| `GET` | `/api/admin/projects` | List all projects (including drafts) |
| `POST` | `/api/admin/projects` | Create a new project (Zod-validated) |
| `PATCH` | `/api/admin/projects/:id` | Update project / toggle published / order |
| `DELETE` | `/api/admin/projects/:id` | Delete a project |
| `POST` | `/api/admin/projects/upload` | Upload project media asset |
| `GET` | `/api/admin/technologies` | List all technologies |
| `POST` | `/api/admin/technologies` | Add technology |
| `PATCH` | `/api/admin/technologies/:id`| Edit technology / visibility |
| `DELETE` | `/api/admin/technologies/:id`| Remove technology |
| `GET` | `/api/admin/achievements` | List all achievements |
| `POST` | `/api/admin/achievements` | Create achievement |
| `PATCH` | `/api/admin/achievements/:id`| Edit achievement |
| `DELETE` | `/api/admin/achievements/:id`| Delete achievement |
| `GET` | `/api/admin/messages` | View contact inbox |
| `PATCH` | `/api/admin/messages/:id/read`| Mark message as read |
| `DELETE` | `/api/admin/messages/:id` | Delete message |
| `PATCH` | `/api/admin/profile` | Update profile biography & links |

---

## Security Architecture

1. **HttpOnly Cookie Authentication**:
   - Authentication tokens are never exposed to client-side JavaScript or stored in `localStorage`.
   - Express session cookies are configured with `httpOnly: true`, `sameSite: 'lax'`, and `secure: true` in production, protecting against XSS token harvesting.
2. **Server-Side Authorization**:
   - Backend routes are protected by `authenticate` (session verification) and `authorizeAdmin` (role validation) middleware. The frontend `ProtectedRoute` provides visual UX routing, but the server is the true authoritative boundary.
3. **Zod Input Validation**:
   - Every write endpoint validates payload structure, types, string lengths, and email formats.
4. **Rate Limiting**:
   - `loginLimiter` protects `POST /api/auth/login` against brute force attacks (10 attempts per 15 minutes).
   - `messageLimiter` protects `POST /api/messages` against spam (10 submissions per hour per IP).
5. **CORS Explicit Allow-List**:
   - Credentials mode enabled with strict origin matching (never wildcard `*`).
6. **Helmet Security Headers**:
   - Sets secure headers including frameguard, nosniff, and cross-origin resource policies.

---

## Running Automated Tests

Run the security and API test suite:

```bash
npm test
```

This verifies:
- Unauthenticated access to admin routes returns `401 Unauthorized`.
- Validation errors return structured 400 responses with details.
- Health check returns 200.
- Undefined routes return structured 404 responses.

---

## Production Deployment

### Frontend (Vercel / Netlify / Cloudflare Pages)

1. Set Root Directory to `frontend` (or run `npm run build` from root).
2. Set Environment Variable:
   ```env
   VITE_API_URL=https://your-api-domain.com/api
   ```
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Backend (Render / Railway / Fly.io / AWS ECS)

1. Set Root Directory to `backend`.
2. Configure Environment Variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `CLIENT_URL=https://your-portfolio-domain.com`
   - `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio-cms`
   - `SESSION_SECRET=<random-32-char-string>`
   - `CLOUDINARY_CLOUD_NAME=<your-cloud-name>`
   - `CLOUDINARY_API_KEY=<your-api-key>`
   - `CLOUDINARY_API_SECRET=<your-api-secret>`
3. Start Command: `npm start`
4. Initial setup: Run `npm run seed` once to initialize the administrator account.

---

## License

MIT License. Designed & Developed for production use.
