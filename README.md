# Arena One – Adventure & Sports E-Commerce Platform

![Arena One Banner](https://via.placeholder.com/1200x400?text=Arena+One+-+Sports+%26+Adventure+Marketplace)

**Arena One** is a full-stack e-commerce platform built on the MERN stack (MongoDB, Express, React, Node.js). It serves as a unified marketplace for sports and adventure gear, integrating three distinct business verticals:

- **Retail (B2C)** – New, high-quality gear from curated brands.
- **Resale (C2C – Arena Loop)** – Peer-to-peer marketplace for used equipment with escrow protection.
- **Rental (Access Economy)** – Pay-per-use model for high-ticket items like trekking tents, cameras, and skiing gear.

The platform targets college students and young professionals, offering affordable access to quality equipment while fostering a circular economy.

🔗 **Live Demo:** [https://arena-iota-two.vercel.app/](https://arena-iota-two.vercel.app/)

---

## Table of Contents

- [Arena One – Adventure \& Sports E-Commerce Platform](#arena-one--adventure--sports-e-commerce-platform)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [User-Facing](#user-facing)
    - [Admin Portal](#admin-portal)
    - [Security (Implemented)](#security-implemented)
  - [Tech Stack](#tech-stack)
  - [System Architecture](#system-architecture)
  - [Database Schema (Simplified)](#database-schema-simplified)
  - [Installation \& Setup](#installation--setup)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
    - [Backend (.env)](#backend-env)
    - [Frontend (.env)](#frontend-env)
  - [Running Locally](#running-locally)
  - [Deployment](#deployment)
  - [Screenshots](#screenshots)
  - [Experiments \& Documentation](#experiments--documentation)
  - [Contributors](#contributors)
  - [License](#license)
  - [Links](#links)

---

## Features

### User-Facing
- **User Authentication** – JWT-based login/signup with role-based access (user / business / admin).
- **Multi-Tier Marketplace** – Browse, buy, sell (resale), or rent sports & adventure gear.
- **Unified Wallet (Arena Credits)** – Earn credits by selling, spend on rentals or retail.
- **Advanced Search & Filters** – By category, price, condition, availability.
- **Rental Calendar** – Check real-time availability and book by date.
- **Secure Payments** – Razorpay integration with escrow for resale and security deposits for rentals.
- **Automated Invoices** – PDF invoices generated instantly after successful payment.
- **Responsive PWA** – Mobile-first design, works offline as a Progressive Web App.

### Admin Portal
- **Order Management** – View, filter, sort, and update order status; bulk actions.
- **Inventory Management** – Add/edit products, adjust stock, low‑stock alerts.
- **User & Dispute Management** – View reports, verify business accounts, adjust trust scores.

### Security (Implemented)
- HTTPS via Let's Encrypt (auto-provisioned by Vercel/Render)
- Rate limiting (100 requests/15 min per IP)
- Input validation & sanitisation (express-validator)
- Password hashing (bcrypt)
- JWT stored in httpOnly cookies (short expiry)
- Ownership middleware (prevents IDOR)
- CORS restriction (frontend domain only)
- Helmet.js for secure HTTP headers

---

## Tech Stack

| Layer                | Technology                                                                 |
|----------------------|----------------------------------------------------------------------------|
| **Frontend**         | React.js, Redux Toolkit, Tailwind CSS, GSAP, Lucide React                  |
| **Backend**          | Node.js, Express.js, JWT, bcrypt, Mongoose ODM                             |
| **Database**         | MongoDB Atlas (cloud)                                                      |
| **Payments**         | Razorpay API (test mode)                                                   |
| **Media Storage**    | Cloudinary                                                                 |
| **Notifications**    | Twilio (SMS) / SendGrid (Email)                                            |
| **Hosting**          | Vercel (frontend), Render (backend)                                        |
| **CI/CD**            | GitHub Actions                                                             |

---

## System Architecture

```
Client (React PWA)  ↔  REST API (Node.js + Express)  ↔  MongoDB Atlas
                              │
                              ├── Razorpay (payments)
                              ├── Cloudinary (media)
                              └── Google Maps API (location)
```

- **Client:** React SPA with Redux for global state. GSAP animations for immersive product exploration.
- **Server:** Express.js handles authentication, business logic, and data validation. JWT for stateless auth.
- **Database:** Polymorphic schema – a single `products` collection with `product_type` field (`retail`/`resale`/`rental`) allows flexible attributes.
- **External Services:** Razorpay (escrow & payments), Cloudinary (image optimisation), Twilio/SendGrid (alerts).

---

## Database Schema (Simplified)

- **users** – email, password_hash, role, trust_score, wallet_balance, verification status.
- **categories** – hierarchical categories (e.g., Hiking & Trekking → Camping).
- **products** – polymorphic: retail (stock_quantity), resale (condition), rental (rental_price_per_day, security_deposit, rental_calendar).
- **orders** – order_number, buyer_id, seller_id, items, total_amount, payment_status, order_status.
- **rentals** – renter_id, owner_id, product_id, start_date, end_date, deposit_status, rental_status.
- **transactions** – ledger of all wallet movements (credits/debits, escrow, refunds).
- **reviews** – ratings for products or users.
- **admin_logs** – audit trail of admin actions.

Full schema is documented in [Experiment 2](./docs/experiment2-database-schema.md).

---

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account (free tier)
- Razorpay test account

### Clone the Repository

```bash
git clone https://github.com/yourusername/arena-one.git
cd arena-one
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # fill in your environment variables
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # set REACT_APP_API_URL = http://localhost:5000
npm start
```

---

## Environment Variables

### Backend (.env)

| Variable            | Description                                    |
|---------------------|------------------------------------------------|
| `PORT`              | Server port (default 5000)                     |
| `MONGODB_URI`       | MongoDB Atlas connection string                |
| `JWT_SECRET`        | Secret key for signing JWT tokens              |
| `FRONTEND_URL`      | Frontend origin (e.g., `http://localhost:3000`) |
| `RAZORPAY_KEY_ID`   | Razorpay test key ID                           |
| `RAZORPAY_KEY_SECRET`| Razorpay test secret                          |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                     |
| `CLOUDINARY_API_KEY`   | Cloudinary API key                         |
| `CLOUDINARY_API_SECRET`| Cloudinary API secret                      |

### Frontend (.env)

| Variable                 | Description                        |
|--------------------------|------------------------------------|
| `REACT_APP_API_URL`      | Backend API URL (e.g., `http://localhost:5000`) |
| `REACT_APP_RAZORPAY_KEY_ID` | Razorpay key ID for frontend     |

---

## Running Locally

1. Start MongoDB Atlas cluster (or local MongoDB).
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm start`
4. Open `http://localhost:3000`

Admin credentials (local dev): `admin@arena.com` / `admin123` (or as seeded).

---

## Deployment

The project is deployed using free tiers:

- **Frontend:** Vercel – automatic HTTPS, connected to GitHub branch.
- **Backend:** Render – Node.js web service, automatically redeploys on push.
- **Database:** MongoDB Atlas – free M0 cluster with IP whitelist.

To deploy your own fork:
1. Push backend to a GitHub repo, create a Render web service linked to it.
2. Push frontend to GitHub, import into Vercel.
3. Set environment variables on both platforms.
4. Update MongoDB Atlas network access to allow Render’s IP (or `0.0.0.0/0` for testing).

---

## Screenshots

| Homepage | Product Detail | Rental Booking |
|----------|---------------|----------------|
| ![Home](https://via.placeholder.com/400x200?text=Homepage) | ![Product](https://via.placeholder.com/400x200?text=Product) | ![Rental](https://via.placeholder.com/400x200?text=Rental) |

| Admin Orders | Admin Inventory | Payment Modal |
|--------------|----------------|---------------|
| ![Orders](https://via.placeholder.com/400x200?text=Orders) | ![Inventory](https://via.placeholder.com/400x200?text=Inventory) | ![Payment](https://via.placeholder.com/400x200?text=Payment) |

*(Add actual screenshots from your live deployment)*

---

## Experiments & Documentation

This project was developed as a series of lab experiments for an E-Commerce course. Detailed reports are available in the `/docs` folder:

- **Experiment 1** – Project Proposal & Requirement Analysis
- **Experiment 2** – System Planning & Architecture Design
- **Experiment 3** – E‑Commerce Website Development
- **Experiment 4** – Order Management & Inventory System (Admin Portal)
- **Experiment 5** – Online Payment System (Razorpay Integration)
- **Experiment 6** – ERP & CRM Integration
- **Experiment 7** – Risk Assessment & Security Implementation
- **Experiment 8** – Digital Marketing & Landing Pages
- **Experiment 9** – Cloud Deployment
- **Experiment 10** – Project Demonstration & Final Report

All experiment documents are available in the `docs/` directory.

---

## Contributors

- **Mohish Padave** – Co-Founder & CEO (Frontend, UI/UX, GSAP animations, product vision)
- **Kshitij Nangare** – Co-Founder & CTO (Backend, database design, payment integration, security)

Built as a semester project for **VESIT – Department of Information Technology**.

---

## License

This project is for educational purposes. All rights reserved by the authors.

---

## Links

- **Live Application:** [https://arena-iota-two.vercel.app/](https://arena-iota-two.vercel.app/)
- **GitHub Repository:** [https://github.com/yourusername/arena-one](https://github.com/yourusername/arena-one)
- **Backend API (Render):** `https://arena-one-api.onrender.com`

---