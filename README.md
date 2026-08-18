# Gigo - Hyperlocal Neighborhood Task Marketplace

A modern, fullstack web platform connecting neighbors to outsource everyday tasks and monetize local micro-services. Built with performance, strict type safety, and end-to-end reliability in mind.

---

## Live Demo & Repository

- **Live Preview:** [gigo.vercel.app](https://neighbor-gig-sage.vercel.app/)
- **GitHub Repository:** [github.com/jakubmotyl/neighbor-gig](https://github.com/jakubmotyl/neighbor-gig)

---

## Tech Stack & Architecture

- **Framework:** Next.js (App Router, Server Components & Server Actions)
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL with [Prisma ORM](prisma/schema.prisma)
- **Authentication:** [NextAuth.js v5](lib/auth.ts) (OAuth with Google + Credentials Strategy)
- **Validation:** [Zod](lib/zod.ts) (Type inference and runtime schema validation)
- **State Management & Caching:** TanStack Query + Next.js Server Cache (`revalidatePath`)
- **Styling:** Tailwind CSS + Lucide Icons
- **Testing & CI/CD:** [Playwright](tests/) running on [GitHub Actions CI Pipeline](.github/workflows/playwright.yml)

---

## Key Features

### Authentication & User Profiles

- Multi-provider authentication (Google OAuth & Email/Password).
- Secure password hashing with reset token flows via email.
- Customizable user profiles: custom avatars, biographical data, location tags, and age verification.
- Dedicated User Dashboard for managing active gigs, inbox messages, and posted requests.

### Task Discovery & Management

- **Hyperlocal Feed:** Filter tasks by category, price ranges, date, and keyword search.
- **Infinite / Paginated Data:** Optimized task fetching using server-side pagination ([paginatedTasks.ts](app/actions/paginatedTasks.ts)) and TanStack Query.
- **Task Lifecycle:** Create, inspect, and delete tasks with instant UI updates and confirmation modals.
- **Offer Placement:** Real-time offer submission on active requests with author inspection ([offers.ts](app/actions/offers.ts)).

### Security & Data Integrity

- Server Action authorization guard rails (verifying session user ownership before executing mutations/deletions).
- Safe parsing of form payloads with Zod before triggering database queries.
- Protected routes using NextAuth middleware and server-side redirects.

---

## Database Architecture (Prisma Schema)

The database schema is structured around a relational model implemented with **Prisma ORM** over **PostgreSQL**, prioritizing data integrity, referential cascade rules, and security.

```mermaid
erDiagram
    User ||--o{ Task : "creates (authorId)"
    User ||--o{ Offer : "submits (userId)"
    Task ||--o{ Offer : "receives (taskId)"

    User ||--o{ Account : "owns"
    User ||--o{ Session : "has"
    User ||--o{ Authenticator : "has"

    User {
        String id PK
        String email UK
        String name
        String password
        String image
        String bio
        String location
        DateTime dateOfBirth
        StringArray skills
        Boolean isVerified
        Float rating
        Int ratingCount
        DateTime createdAt
        DateTime updatedAt
    }

    Task {
        String id PK
        String title
        String description
        String categorySlug
        String location
        Int price
        Boolean isBoosted
        ExecutionTime executionTime
        String authorId FK
        DateTime createdAt
    }

    Offer {
        String id PK
        String message
        Int price
        OfferStatus status
        String taskId FK
        String userId FK
        DateTime createdAt
    }

    Account {
        String provider PK
        String providerAccountId PK
        String userId FK
        String type
        String access_token
        String refresh_token
        Int expires_at
    }

    Session {
        String sessionToken UK
        String userId FK
        DateTime expires
    }

    PasswordResetToken {
        String id PK
        String email
        String token UK
        DateTime expires
    }
```

#### User (Core Identity & Reputation)

- Serves as the central entity supporting dual authentication modes (OAuth & Credentials).
- Encapsulates extended profile attributes (`bio`, `location`, `skills`, `dateOfBirth`) alongside aggregated reputation metrics (`rating`, `ratingCount`, `isVerified`).
- Features strict `1:N` relationships with cascading deletions for owned tasks, submitted proposals, and active sessions.

#### Task (Micro-Service Listings)

- Represents localized service requests categorized by dynamic slugs (`categorySlug`).
- Supports flexible scheduling policies via the `ExecutionTime` enum (`ASAP`, `WITHIN_FEW_DAYS`, `THIS_WEEKEND`, `FLEXIBLE`).
- Implements promotional highlighting through the `isBoosted` flag.

#### Offer (Bid & Proposal Mechanism)

- Bridges gig creators (`Task`) and service providers (`User`) with pricing proposals and pitch messages.
- **Composite Unique Constraint (`@@unique([taskId, userId])`):** Ensures at the database level that a user can submit only one active proposal per task, preventing duplicate bidding.
- Tracks proposal lifecycle transitions via the `OfferStatus` enum (`PENDING`, `ACCEPTED`, `REJECTED`).

#### Auth & Security (`Account`, `Session`, `Authenticator`, `PasswordResetToken`)

- Fully compliant with standard **Auth.js / NextAuth v5** schema specifications for secure session storage and OAuth token rotation.
- `PasswordResetToken` uses cryptographic expiration boundaries (`expires`) and dual unique indexing (`[email, token]`) to mitigate race conditions during account recovery.

---

## Application Overview (Routing & Pages)

| Route                         | Type                   | Description                                                                             |
| :---------------------------- | :--------------------- | :-------------------------------------------------------------------------------------- |
| `/`                           | Public (RSC)           | Landing page with Hero search, category teasers, and "How it works" guide.              |
| `/zlecenia`                   | Public (Client/Server) | Filterable and searchable marketplace catalog with pagination and skeleton loaders.     |
| `/zlecenia/[slug]`            | Public (Dynamic RSC)   | Detailed view of a task, author card, and bidding / proposal form.                      |
| `/dodaj-zlecenie`             | Protected              | Multi-field form for publishing a new gig.                                              |
| `/profil/edytuj`              | Protected              | Interactive dashboard managing active tasks, profile information, and account settings. |
| `/profil/[id]`                | Public                 | Public view of user reputation, reviews, and active listings.                           |
| `/logowanie` / `/rejestracja` | Public                 | Auth portals supporting OAuth and credentials.                                          |
| `/przypomnij-haslo`           | Public                 | Password recovery flow with time-bound token generation.                                |

---

## Getting Started Locally

### 1. Prerequisites

- **Node.js**: `v18.18.0` or higher
- **npm** / **pnpm** / **yarn**

### 2. Clone repository & install dependencies

```bash
git clone https://github.com/jakubmotyl/neighbor-gig.git
cd neighbor-gig
npm install
```

### 3. Environment Configuration

Create a .env file in the root directory and configure the following variables:

```bash
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/neighborgig?schema=public"

# NextAuth Configuration
AUTH_SECRET="your-super-secret-random-key" # generated with `openssl rand -base64 33`
AUTH_TRUST_HOST=true

# Google OAuth Credentials
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Transactional Email (Resend)
RESEND_API_KEY="re_123456789"
```

### Note on Email Service in Demo:

Password reset logic and token generation are fully implemented in [password.ts](app/actions/password.ts). Because the live deployment uses a free Resend sandbox tier (without a custom verified domain), outgoing reset emails can only be delivered to the developer's registered address.

### 4. Database Setup & Migration

```bash
npx prisma generate
npx prisma migrate dev
# (Optional) Open Prisma Studio to inspect data:
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Running Tests (Playwright)

End-to-End test suites cover critical navigation, authentication, and task creation flows:

```bash
# Run tests in headless mode
npx playwright test

# Run tests with interactive UI
npx playwright test --ui
```
