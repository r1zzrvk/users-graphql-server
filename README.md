# Users GraphQL Server

GraphQL CRUD application built with **TypeScript + Apollo Server + MongoDB (Mongoose)**.
Features scalable architecture with validation, logging and service layer.

---

## Tech Stack

| Technology        | Purpose                                 |
| ----------------- | --------------------------------------- |
| **TypeScript**    | Static typing and structure enforcement |
| **Apollo Server** | GraphQL server                          |
| **GraphQL**       | Declarative API layer                   |
| **Mongoose**      | MongoDB ORM                             |
| **Zod**           | Input validation                        |
| **Pino**          | High-performance logging                |

---

## Project Structure

```bash
src/
│
├── models/              # Mongoose models
│   └── User.ts
│
├── services/            # Business logic
│   └── userService.ts
│
├── validation/          # Zod schemas
│   └── user.ts
│
├── errors/              # Custom error classes
│   └── index.ts
│
├── utils/               # Utilities
│   └── logger.ts
│
├── plugins/             # Apollo plugins
│   └── loggerPlugin.ts
│
├── schema/
│   ├── typeDefs.ts      # GraphQL schema definitions
│   ├── resolvers/
│   │   ├── mutationResolvers.ts
│   │   ├── queryResolvers.ts
│   │   └── ...
│   └── resolvers.ts     # Combined resolvers
│
└── index.ts             # Entry point
```

---

## Installation & Setup

### Requirements:

- Node.js **v20 or higher**
- Environment variable `MONGO_URI` must be set to your MongoDB connection string

```bash
git clone https://github.com/r1zzrvk/users-graphql-server.git
cd users-graphql-server
npm install
```

### Development:

```bash
npm run dev
```

### Build:

```bash
npm run build
```

### Run built version:

```bash
npm start
```

---

## Architectural Features

### 🔹 Service Layer (`/services`)

### 🔹 Validation via `zod`

### 🔹 Centralized Error Handling

### 🔹 Logging via `pino`

---

## Example API

```graphql
query {
  users(skip: 0, limit: 10, filter: { search: "john" }) {
    id
    name
    email
  }
}

mutation {
  createUser(input: { email: "test@example.com", name: "Test" }) {
    id
    name
  }
}
```

---
