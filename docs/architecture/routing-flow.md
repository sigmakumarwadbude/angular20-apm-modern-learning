# Routing & Navigation Flow

This document details the route structure, lazy loading mechanics, and component resolution lifecycle of the application.

---

## 1. Global Routing Architecture

Routing is managed via a modern standalone design. Rather than loading all component code at application startup, the router lazy-loads separate JavaScript "chunks" for each feature module dynamically.

```mermaid
graph TD
    classDef root fill:#eef2ff,stroke:#6366f1,stroke-width:2px,color:#1e1b4b;
    classDef feature fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d;
    classDef chunk fill:#fff7ed,stroke:#ea580c,stroke-width:2px,color:#7c2d12;

    A[app.routes.ts - Main Route Definitions]:::root -->|path: ''| B[Lazy Load: HOME_ROUTES]:::feature
    A -->|path: 'products'| C[Lazy Load: PRODUCT_ROUTES]:::feature
    
    B -->|Resolves Chunk| HomeChunk[home-page.js Chunk]:::chunk
    C -->|Resolves Chunk| ProductChunk[product-feature.js Chunk]:::chunk
```

---

## 2. Lazy Component Loading Sequence

When a user navigates to a route, Angular triggers an asynchronous file request to fetch the corresponding standalone page bundle.

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Router as Angular Router
    participant Engine as Engine (Lazy Loader)
    participant Server as Web Server (or Container)
    participant Viewport as Router Outlet
    
    User->>Router: Click link (e.g. /products)
    Router->>Router: Match route configuration
    Router->>Engine: Trigger loadChildren() / loadComponent()
    Engine->>Server: HTTP GET: product-list.js (Lazy chunk)
    Server-->>Engine: Returns minified js bundle
    Engine->>Engine: Compile standalone component metadata
    Engine->>Router: Resolve component class references
    Router->>Viewport: Mount & Render HomePage / ProductList Component
```

---

## 3. Navigation Lifecycle

Every navigation request goes through a strict multi-step lifecycle before any new component is loaded and mounted:

```mermaid
graph TD
    classDef step fill:#fafaf9,stroke:#78716c,stroke-width:2px,color:#292524;
    classDef success fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d;
    classDef fail fill:#fef2f2,stroke:#ef4444,stroke-width:2px,color:#7f1d1d;

    NavStart[1. Navigation Started]:::step --> GuardCheck{2. Run CanActivate Guards}:::step
    
    GuardCheck -->|Unauthorized| CancelNav[Navigation Rejected]:::fail
    GuardCheck -->|Authorized| ResolveData{3. Run Resolver Data Prefetch}:::step
    
    ResolveData -->|Fetch Failed| ErrorPage[Render Error Boundary Page]:::fail
    ResolveData -->|Success| FetchChunk[4. Fetch Lazy Chunk Files]:::step
    
    FetchChunk --> Render[5. Mount Component to Router Outlet]:::success
```

---

## 4. Current & Planned Route Mapping

The router configurations are split into clean files according to their domains:

### Root Level (`app.routes.ts`)
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/routes').then(m => m.PRODUCT_ROUTES)
  }
];
```

### Home Feature Level (`features/home/routes.ts`)
```typescript
import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
  }
];
```
