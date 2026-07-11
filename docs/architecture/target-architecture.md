# Target Architecture (Future State)

> **Project:** Angular 22 APM Modern Learning

This document describes the target enterprise architecture for the Acme Product Management (APM) application as it evolves from a learning project into an enterprise-ready Angular 22 application.

---

# 1. Architecture Principles

- Standalone-first
- Signals-first
- Feature-first architecture
- Smart Pages / Presentational Components
- Docker-first development
- Incremental modernization using milestone-based Git tags

---

# 2. Current Architecture

## Current Capabilities

- ✅ Angular 22
- ✅ Standalone Components
- ✅ Signals (`signal`, `computed`, `input`, `output`)
- ✅ Feature-based architecture
- ✅ Shared components (Navbar, Star)
- ✅ Shared pipes
- ✅ Tailwind CSS
- ✅ Docker development environment

> **Routing**
>
> After the Angular 22 upgrade, routes are currently **eager loaded**. Lazy loading will be reintroduced in a future milestone.

```text
User
 ↓
Browser
 ↓
Angular 22 Application
 ↓
App Shell
 ↓
Angular Router (Eager)
 ├── Home
 └── Products
```

---

# 3. Target Enterprise Architecture

```text
App Shell
    │
Angular Router (Lazy)
    ├── Home
    ├── Products
    ├── Orders
    └── Reports
```

Future shared layer

```text
shared/
├── components/
├── pipes/
├── directives/
├── guards/
├── interceptors/
├── validators/
└── utils/
```

---

# 4. Backend Architecture

Current

```text
Angular
   ↓
Static In-Memory Data
```

Target

```text
Angular
   ↓
HttpClient
   ↓
Node.js REST API
   ↓
Database
```

---

# 5. State Management

Current

- Local Signals
- computed()
- input()/output()

Target

- NgRx SignalStore
- withState()
- withComputed()
- withMethods()
- rxMethod()

---

# 6. Security

Future

- Functional HTTP Interceptors
- JWT Authentication
- Route Guards
- Global Error Handling
- Request Caching

---

# 7. Enterprise UI

- AG Grid Community
- Monaco Editor
- Responsive Layout
- Feature-driven UI

---

# 8. Containerization

Current

- Docker Compose
- Angular Dev Server

Target

- Multi-stage Docker
- Nginx Production Image

---

# 9. Angular 22 Roadmap

Current

- Standalone Components
- Signals
- input()
- output()

Future

- model()
- linkedSignal()
- httpResource()
- Zoneless Change Detection

---

# 10. Modernization Roadmap

| Tag | Milestone | Description |
|------|-----------|-------------|
|00-tailwind-complete|Tailwind CSS Setup|UI foundation|
|01-home-feature|Home Feature|Dashboard implementation|
|02-navigation|Navigation|App shell and routing|
|03-product-list|Product List|Browse products|
|04-product-filter|Product Filter|Search products|
|05-product-detail|Product Detail|Product details page|
|06-star-component|Shared Star Component|Reusable rating component|
|07-angular-22-upgrade|Angular 22 Upgrade|Framework migration|
|08-node-product-api|Node.js Product CRUD API|Express.js + TypeScript + Docker + CRUD REST API|
|09-http-client|Angular HttpClient Integration|Replace static data with REST API|
|10-ag-grid|AG Grid Integration|Enterprise data grid|
|11-monaco-editor|Monaco Editor|JSON Inspector|
|12-signal-store|NgRx SignalStore|Enterprise state management|
|13-authentication|Authentication & Authorization|JWT, Guards & Interceptors|
|14-production-docker|Production Docker|Multi-stage Docker + Nginx|
|v1.0.0-enterprise-apm|Enterprise Release|Production-ready Angular application|

---

## Milestone 08 – Node.js Product CRUD API

### Technology Stack

- Node.js 22 LTS
- Express.js
- TypeScript
- Docker
- Nodemon
- REST API
- CORS

### Folder Structure

```text
product-api/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── data/
│   │   └── products.json
│   ├── app.ts
│   └── server.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

### REST Endpoints

| Method | Endpoint |
|---------|----------|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

# 11. Current vs Target

| Capability | Current | Target |
|------------|---------|--------|
|Angular|22|22|
|Routing|Eager|Lazy|
|Data|Static|Node.js REST API|
|HTTP|None|HttpClient|
|State|Signals|SignalStore|
|Grid|HTML Table|AG Grid|
|Editor|None|Monaco|
|Docker|Development|Production|

---

# 12. Vision

Build a modern Angular 22 reference application demonstrating enterprise architecture, feature-driven design, Signals, Node.js APIs, Docker, AG Grid, Monaco Editor, authentication, and scalable development practices.
