# System Design Documentation

## 🏗 Architecture

The project follows a **Clean Architecture** (layered) approach to ensure separation of concerns, maintainability, and testability.

### Backend Layers
1.  **Domain Layer (`src/domain`):** Contains entities (Schemas), and repository interfaces. This layer is independent of any external frameworks.
2.  **Application Layer (`src/application`):** Contains Use Cases that orchestrate the flow of data to and from the domain entities.
3.  **Infrastructure Layer (`src/infrastructure`):** Implements the repository interfaces using Mongoose and handles external service integrations.
4.  **Presentation Layer (`src/presentation`):** Contains Controllers and DTOs to handle HTTP requests and responses.

### Frontend Layers
1.  **Pages:** Nuxt 3 file-based routing for different views (Dashboard, Reports).
2.  **Components:** Reusable UI elements (Tables, Modals, Stats Cards).
3.  **Stores (Pinia):** Centralized state management for transactions and financial data.
4.  **Utils:** Shared logic for formatting and calculations.

---

## 📊 Data Modeling

The system uses MongoDB with the following entity relationships:

- **Agency:** The top-level entity representing the company.
- **Agent:** The subject of a transaction. Tracks deal count (selling deal, listing deal)
- **Property:** The subject of a transaction. Tracks total money 
- **Transaction:** The core entity that links a Property, a Listing Agent, and a Selling Agent. It tracks the `stage` and `totalServiceFee`.

### Transaction Stages
A transaction must follow a specific sequence:
`agreement` ➡️ `earnest_money` ➡️ `title_deed` ➡️ `completed`

---

## 💰 Business Logic: Commission Policy

The commission calculation is a critical part of the system and is implemented in the `GetFinancialBreakdownUseCase`.

### Rules:
1.  **Total Service Fee:** 100%
2.  **Agency Share:** Always 50% of the total fee.
3.  **Agent Share:** Remaining 50% of the total fee.
    - **Scenario A (Same Agent):** If the listing agent and selling agent are the same person, they receive the full 50% agent share.
    - **Scenario B (Different Agents):** The 50% agent share is split equally (25% each) between the listing and selling agents.

### Implementation Strategy:
We chose to **calculate the breakdown dynamically** rather than storing it. This ensures that if commission policies change in the future, historical data can be re-calculated or adjusted without database migrations, and it maintains a "single source of truth" (the `totalServiceFee`).

---

## 🎨 Frontend Design Decisions

### State Management (Pinia)
We use Pinia to store the transaction list globally. This allows the **Dashboard** and **Reports** pages to stay in sync without redundant API calls. The `financialReports` getter in the store handles the aggregation of earnings across all completed transactions.

### Component Architecture
- **TransactionTable:** A dynamic component that allows status updates and opens the breakdown modal.
- **FinancialBreakdownModal:** Fetches and displays detailed commission data for a specific transaction.
- **StatsSummary:** Provides a high-level overview of total earnings.

---

## 🛡 Security & Validation

- **DTOs (Data Transfer Objects):** Used in the backend to validate incoming request bodies using `class-validator`.
- **Mongoose Schemas:** Ensure data integrity at the database level.
- **Environment Variables:** Sensitive data (MongoDB URI) is stored in `.env` and never committed to version control.

