# Target Architecture (Future State)

This document maps the target architecture of the **Acme Product Management (APM)** application as it transitions from a lightweight learning repository to an enterprise-grade, scalable platform.

---

## 1. Enterprise Multi-Feature Scaling

As the platform scales to support robust inventory, ordering, and reporting domains, the modular directory structure expands to support shared resources and clean core system interfaces.

```mermaid
graph TD
    classDef shell fill:#f8fafc,stroke:#64748b,stroke-width:2px,color:#0f172a;
    classDef feature fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d;
    classDef shared fill:#fff7ed,stroke:#ea580c,stroke-width:2px,color:#7c2d12;

    AppShell[App Shell - Core Router]:::shell --> Home[Home / Dashboard Feature]:::feature
    AppShell --> Products[Products Feature Module]:::feature
    AppShell --> Orders[Orders Feature Module]:::feature
    AppShell --> Reports[Reports Feature Module]:::feature
    
    Home --> SharedComponents[Shared Components]:::shared
    Products --> SharedComponents
    Orders --> SharedComponents
    
    Products --> DataAccess[Shared Services & API Gateway]:::shared
    Orders --> DataAccess
```

---

## 2. Advanced State Management: NgRx SignalStore

While local component signals work beautifully for page-level state, multi-feature orchestration requires a lightweight, structured state store. The target state architecture incorporates **NgRx SignalStore** to enforce predictable state transactions:

```mermaid
graph LR
    classDef component fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d;
    classDef store fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#581c87;
    classDef api fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e3a8a;

    View[Smart Component Page]:::component -->|Calls Methods| Store[NgRx SignalStore]:::store
    Store -->|Triggers HTTP Requests| API[API Gateway Services]:::api
    API -->|Resolves Responses| Store
    Store -.->|Exposes Read-Only Signals| View
```

- **Declarative Features**: Enforces structural design patterns utilizing `withState()`, `withComputed()`, and `withMethods()` for cohesive state files.
- **Side Effect Control**: Incorporates standard reactive effects (`rxMethod()`) to cleanly stream async network responses directly into the signal state store.

---

## 3. API Interceptor & Security Boundaries

A robust network boundary is established using Angular HTTP Interceptors to handle global cross-cutting concerns:

```mermaid
graph TD
    classDef client fill:#fdf2f8,stroke:#db2777,stroke-width:2px,color:#701a75;
    classDef inter fill:#f0faf6,stroke:#10b981,stroke-width:2px,color:#064e3b;
    classDef server fill:#fafafa,stroke:#737373,stroke-width:2px,color:#171717;

    Client[HttpClient Request]:::client --> Auth[Auth Interceptor: Injects Bearer Token]:::inter
    Auth --> Cache[Cache Interceptor: Returns cached results if active]:::inter
    Cache --> Error[Global Error Interceptor: Graceful failure handling]:::inter
    Error --> Server[Remote API Server]:::server
```

- **Authentication Interceptor**: Automatically appends OAuth2 Bearer tokens to authorized domain requests.
- **Retry & Error Interceptor**: Catches failed network requests and retries automatically, or displays a global toast notification for 5xx errors.
- **Route Guards**: Route boundaries are guarded using modern standalone functional guards (`canActivate`) to check authentication state and user roles.

---

## 4. Multi-Stage Production Containerization

For local development, the app mounts local volumes. For production, the target build pipeline implements a highly optimized **Multi-Stage Dockerfile** to build static assets and serve them via a performant web server.

```mermaid
graph TD
    classDef stage fill:#fafaf9,stroke:#78716c,stroke-width:2px,color:#292524;
    classDef out fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d;

    subgraph BuildStage [Stage 1: Build Environment]
        A[alpine-node:22]:::stage --> B[npm ci - Install Locked Dependencies]:::stage
        B --> C[ng build --configuration production]:::stage
    end

    subgraph ServerStage [Stage 2: High Performance Web Server]
        C -->|Copies /dist Static Assets| D[nginx:alpine]:::stage
        E[Custom nginx.conf]:::stage --> D
        D --> F[Exposed Port 80 / 443]:::stage
    end

    F --> Release[Minified, High-Performance App Bundle]:::out
```

- **Optimized Size**: The final image contains only minified static assets and a lightweight Nginx web server, reducing the image size by over 80% compared to development runtimes.
- **Custom Router Configuration**: Configures Nginx to support SPA fallback routing (`try_files $uri $uri/ /index.html`), preventing standard 404 errors on direct navigation routes.
