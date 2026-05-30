# Current Architecture Design

This document details the active technical state of the **Acme Product Management (APM) Modern Learning** application, built using Angular 20.

![Angular 20 APM Modern Learning Enterprise Architecture Diagram](../images/architecture_diagram.png)

---

## 1. Modular & Standalone Layout

The application has eliminated legacy Angular modules (`NgModule`) in favor of **Standalone Components**. This reduces boilerplate and introduces strict, clean component boundaries.

### High-Level Component & Service Structure

```mermaid
graph TD
    classDef main fill:#eef2ff,stroke:#6366f1,stroke-width:2px,color:#1e1b4b;
    classDef feature fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d;
    classDef config fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#581c87;

    A[main.ts - Bootstrap]:::main --> B[app.config.ts - App Providers]:::config
    A --> C[App - Root Shell Component]:::main
    C --> D{Angular Router}:::main
    D -->|Lazy Loads| E[Feature Routes: HOME_ROUTES]:::feature
    E --> F[HomePage - Smart Page Component]:::feature
```

---

## 2. Directory Layout & Roles

The codebase organizes directories by features to enforce separation of concerns and component reusability.

```
src/app/
├── app.config.ts       # Global dependency injection providers
├── app.routes.ts       # Core router configurations
├── app.ts              # Root shell component class
├── app.html            # Main viewport structure containing <router-outlet />
├── app.scss            # Global root shell component styling
└── features/           # Feature-driven boundaries
    └── home/           # Home Module Folder
        ├── components/ # Presentational (Dumb) Components (e.g. DashboardCard, QuickAction)
        ├── models/     # Domain interfaces & type definitions (e.g. DashboardStat)
        ├── pages/      # Smart Orchestrator Pages (e.g. HomePage)
        ├── services/   # Business logic & local reactive state management
        └── routes.ts   # Lazy-load feature route configuration
```

### Modular Directory Roles
- **Pages (Smart / Container Components)**: Manage page layout, route integration, and inject data-fetching services. They stream state down to presentational components.
- **Components (Presentational / Dumb Components)**: Focus entirely on visual layout. They take Signal inputs (`input()`), render values, and trigger outputs/events up to Smart Components without managing external service state.
- **Services**: Act as the **Single Source of Truth** for state management, leveraging Angular Signals for modern reactive bindings.
- **Models**: Simple, type-safe data structure declarations.

---

## 3. Reactive State via Angular Signals

The system utilizes native **Angular Signals** (`signal<T>()` and `input()`) for fine-grained change detection and state updates, preventing unnecessary rendering cycles.

```mermaid
sequenceDiagram
    autonumber
    participant Service as HomeService (State Store)
    participant Page as HomePage (Smart Page)
    participant Component as DashboardCard (Dumb Component)
    
    Note over Service: Defines reactive signal:<br/>stats = signal(DashboardStat[])
    Page->>Service: Inject HomeService
    Note over Page: Binds stats() read-only view
    Page->>Component: Pass data via Signal inputs:<br/>[title]="stat.title" [value]="stat.value"
    Note over Component: Listens to signal changes.<br/>Renders new values instantly!
```

---

## 4. Containerized Local Development

The workspace is fully containerized using **Docker** and **Docker Compose** to ensure localized developer environment consistency with zero environmental friction.

```mermaid
graph LR
    classDef dev fill:#fff7ed,stroke:#ea580c,stroke-width:2px,color:#7c2d12;
    classDef docker fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0c4a6e;
    classDef browser fill:#fdf2f8,stroke:#db2777,stroke-width:2px,color:#701a75;

    Developer([Local File System]):::dev -->|Mounts Workspace via Docker Volume| Volume[(/app Volume)]:::docker
    Volume --> Engine[Docker Compose Host]:::docker
    Engine --> Container[Angular Dev Server inside node:22-alpine Container]:::docker
    Container -->|Vite / Esbuild Dev Server| Port[Exposed Port 4200]:::docker
    Port --> Browser([Host Browser - http://localhost:4200]):::browser
    Browser -.->|Hot Reload / Live Updates| Developer
```
