# Peer Tutoring Booking Platform

A web platform connecting peer tutors with tutees for academic guidance, session scheduling, and booking management.

---

## 📌 Project Concept & Architecture

The **Peer Tutoring Booking Platform** allows students to find peer tutors, browse scheduled tutoring sessions by subject, and manage session bookings with real-time status updates and AI-assisted topic/session description generation.

### Core Domain Entities
1. **User**: Represents participants with a role field (`tutor`, `tutee`, or `admin`).
2. **TutoringSession / Course**: Represents offered peer tutoring sessions, including topic details, course codes, and tutor assignments.
3. **Booking**: Represents a tutee's booking request for a session with a multi-step lifecycle enum (`requested` → `confirmed` → `completed` / `cancelled`).

---

## 🚀 Module Feature Roadmap

| Requirement | Implementation Feature |
| :--- | :--- |
| **Auth Role/Type Field** | `UserRole` (`TUTOR`, `TUTEE`, `ADMIN`) powering Module 3 auth roles. |
| **Multi-step Status Lifecycle** | `BookingStatus` (`REQUESTED` → `CONFIRMED` → `COMPLETED` / `CANCELLED`). |
| **List-then-Detail Relationship** | Tutoring Sessions list → Session / Booking detail view for Module 3 routing. |
| **Live Feature (Module 4)** | Live booking request counts & instant real-time booking status notifications. |
| **Generative AI Feature (Module 5)** | AI-powered session description writer & AI tutor-tutee matching recommendations. |

---

## 💻 TypeScript Implementation (GT1 Requirements)

All TypeScript types and generic utilities are located in [`types/index.ts`](file:///c:/Users/Marcus%20Rodillo/Desktop/itelect4/types/index.ts) and [`src/types/index.ts`](file:///c:/Users/Marcus%20Rodillo/Desktop/itelect4/src/types/index.ts):

- **Part 1 Entities & Domain Entities**: `User`, `Course`, `Submission`, `TutoringSession`, `Booking`.
- **Enums**:
  - `UserRole` (`tutor`, `tutee`, `admin`)
  - `BookingStatus` (`requested`, `confirmed`, `completed`, `cancelled`)
- **Generic Interface**: `ApiResponse<T>` with `status`, `data`, and optional `message`.
- **Generic Functions**:
  - `getById<T extends { id: string | number }>(items: T[], id: string | number): T | undefined`
  - `getFirst<T>(items: T[]): T | undefined`
- **Utility Types Used**:
  - `Partial<User>` (`UpdateUserDto`)
  - `Omit<Booking, "id">` (`CreateBookingDto`)
  - `Pick<User, "id" | "name" | "role">` (`UserSummaryDto`)
  - `Record<number, Booking>` (`BookingDictionary`)

---

## 🛠️ How to Run & Validate

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Type Checking (Zero Errors)
```bash
npx tsc --noEmit
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🏷️ Version Tag

Tag name: `gt1`
