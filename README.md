# Estate Management System

A full-stack solution for automating real estate transaction lifecycles and accurately managing financial distributions between agencies and agents.

## 🚀 Project Overview

This project was developed as a technical solution for an estate agency consultancy to solve the problem of manual transaction tracking and complex commission calculations. It automates the process from the initial agreement to the final completion, ensuring traceability and accurate financial reporting.

App Link https://estate-lake-ten.vercel.app?_vercel_share=A0zLxR00TYkNchVtaRCYwhTR4e8Ph5qv

## 🛠 Tech Stack

### Backend
- **Framework:** [NestJS](https://nestjs.com/) (LTS)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/)
- **Testing:** [Jest](https://jestjs.io/)

### Frontend
- **Framework:** [Nuxt 3](https://nuxt.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## ✨ Core Features

- **Transaction Lifecycle Tracking:** Manage stages from `agreement` -> `earnest_money` -> `title_deed` -> `completed`.
- **Automated Commission Distribution:**
  - 50% to the Agency.
  - 50% shared among Agents (Listing vs. Selling).
  - Smart handling of scenarios where an agent fulfills both roles.
- **Financial Breakdown:** Instant visualization of earnings for all stakeholders on any transaction.
- **Interactive Dashboard:** Real-time updates and status transitions.
- **Comprehensive Reporting:** Summary of total agency earnings and individual agent performance.

## ⚙️ Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `backend` root and add your MongoDB Atlas URI:
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   PORT=3001
   ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `frontend` root:
   ```env
   NUXT_PUBLIC_API_BASE=http://localhost:3001
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

### Backend Tests
The backend includes unit tests for commission rules, stage transitions, and repository logic.
```bash
cd backend
npm run test
```

## 📖 Design Documentation
For a detailed explanation of the architecture, data models, and design decisions, please refer to [DESIGN.md](./DESIGN.md).
