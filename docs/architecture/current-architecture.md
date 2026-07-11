# Current Architecture Design

This document details the active technical state of the **Acme Product Management (APM) Modern Learning** application, built using Angular 22.

![Angular 22 APM Modern Learning Enterprise Architecture Diagram](../images/current_architecture_diagram.png)

---

## 1. Modular & Standalone Layout

The application has eliminated legacy Angular modules (`NgModule`) in favor of **Standalone Components**. This reduces boilerplate and introduces strict, clean component boundaries.

### High-Level Component & Service Structure

```mermaid
graph TD
    classDef main fill:#eef2ff,stroke:#6366f1,stroke-width:2px,color:#1e1b4b;
    classDef feature fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d;
    classDef shared fill:#fffbeb,stroke:#f59e0b,stroke-width:2px,color:#78350f;
    classDef config fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#581c87;

    A[main.ts - Bootstrap]:::main --> B[app.config.ts - App Providers]:::config
    A --> C[App - Root Shell Component]:::main
    C --> NAV[Navbar - Shared Navigation]:::shared
    C --> D{Angular Router}:::main
    D -->|Lazy Loads| E[HOME_ROUTES]:::feature
    D -->|Lazy Loads| F[PRODUCT_ROUTES]:::feature
    E --> G[HomePage - Smart Page]:::feature
    F --> H[ProductListComponent - Smart Page]:::feature
    F --> I[ProductDetailComponent - Smart Page]:::feature
    H --> PS[ProductSearchComponent - Dumb]:::feature
    H --> STAR[StarComponent - Shared Dumb]:::shared
    H --> PIPE[ConvertToSpacesPipe - Shared]:::shared
```

---

## 2. Directory Layout & Roles

The codebase organizes directories by features and a shared library to enforce separation of concerns and cross-feature reusability.

```
src/app/
├── app.config.ts          # Global dependency injection providers
├── app.routes.ts          # Core router configurations (lazy loads home & products)
├── app.ts                 # Root shell component (hosts Navbar + router-outlet)
├── features/              # Feature-driven boundaries
│   ├── home/              # Home feature
│   │   ├── components/    # Presentational (Dumb) components
│   │   ├── constants/     # Feature-scoped constant values
│   │   ├── models/        # Domain interfaces & type definitions
│   │   ├── pages/         # Smart Orchestrator Pages (e.g. HomePage)
│   │   ├── services/      # Business logic & reactive state management
│   │   └── routes.ts      # Lazy-load feature route config (HOME_ROUTES)
│   └── products/          # Products feature
│       ├── components/    # Presentational (Dumb) components
│       │   └── product-search/  # ProductSearchComponent
│       ├── data/          # Static in-memory data (products.ts)
│       ├── models/        # IProduct interface
│       ├── pages/         # Smart Orchestrator Pages
│       │   ├── product-list/    # ProductListComponent (route: /products)
│       │   └── product-detail/  # ProductDetailComponent (route: /products/:id)
│       ├── services/      # ProductService (data access layer)
│       └── routes.ts      # Lazy-load feature route config (PRODUCT_ROUTES)
└── shared/                # Cross-feature reusable building blocks
    ├── components/
    │   ├── navbar/        # Navbar - global navigation shell
    │   └── star/          # StarComponent - reusable star rating display
    └── pipes/
        └── convert-to-spaces.pipe.ts  # ConvertToSpacesPipe
```

### Modular Directory Roles
- **Pages (Smart / Container Components)**: Manage page layout, route integration, and inject data-fetching services. They stream state down to presentational components.
- **Components (Presentational / Dumb Components)**: Focus entirely on visual layout. They receive Signal inputs (`input()`) or `@Input()` decorator-based inputs, render values, and emit events upward to Smart Components.
- **Services**: Act as the **Single Source of Truth** for data access. `ProductService` provides synchronous in-memory data lookup via `PRODUCTS` static data.
- **Models**: Simple, type-safe data structure declarations (e.g. `IProduct`).
- **Shared**: Cross-feature components (`Navbar`, `StarComponent`) and utilities (`ConvertToSpacesPipe`) live here and are imported directly by any feature that needs them.

---

## 3. Routing Architecture

The app uses Angular's **lazy-loaded feature routes** registered at the root `app.routes.ts` level.

```mermaid
graph LR
    classDef route fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0c4a6e;
    classDef page fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d;
    classDef wildcard fill:#fff1f2,stroke:#e11d48,stroke-width:2px,color:#881337;

    ROOT["/  →  HOME_ROUTES lazy"]:::route --> HOME[HomePage]:::page
    PROD["/products  →  PRODUCT_ROUTES lazy"]:::route --> LIST[ProductListComponent]:::page
    PROD --> DETAIL["/products/:id  →  ProductDetailComponent"]:::page
    WILD["/**  →  redirectTo: ''"]:::wildcard
```

| Path | Component | Route File |
|---|---|---|
| `/` | `HomePage` | `home/routes.ts` → `HOME_ROUTES` |
| `/products` | `ProductListComponent` | `products/routes.ts` → `PRODUCT_ROUTES` |
| `/products/:id` | `ProductDetailComponent` | `products/routes.ts` → `PRODUCT_ROUTES` |
| `/**` | Redirect to `/` | `app.routes.ts` |

---

## 4. Reactive State via Angular Signals

The system utilizes native **Angular Signals** (`signal<T>()`, `computed()`, `input()`, and `output()`) for fine-grained change detection.

### Products Feature – Signal Data Flow

```mermaid
sequenceDiagram
    autonumber
    participant Service as ProductService (Data Access)
    participant List as ProductListComponent (Smart Page)
    participant Search as ProductSearchComponent (Dumb)
    participant Star as StarComponent (Shared Dumb)

    Note over Service: Returns IProduct[] from static PRODUCTS data
    List->>Service: inject(ProductService).getProducts()
    Note over List: products = signal(IProduct[])<br/>searchTerm = signal('')<br/>filteredProducts = computed(...)
    List->>Search: [searchTerm]="searchTerm()" (Signal input)
    Search-->>List: (searchChange) → onSearchChange(value)
    Note over List: searchTerm.set(value) → filteredProducts recomputes
    List->>Star: [rating]="product.starRating" (@Input)
    Star-->>List: (ratingClicked) → onRatingClicked(message)
```

### ProductDetailComponent – Route-Driven Signal State

```mermaid
sequenceDiagram
    autonumber
    participant Router as ActivatedRoute
    participant Detail as ProductDetailComponent
    participant Service as ProductService

    Detail->>Router: snapshot.paramMap.get('id') on ngOnInit
    Detail->>Service: getProduct(id)
    Note over Detail: product = signal<IProduct | undefined>(undefined)<br/>product.set(found product)
    Detail-->>Router: router.navigate(['/products']) on back
```

---

## 5. Shared Library

The `src/app/shared/` directory contains cross-feature reusable pieces that are imported directly (standalone) without a barrel module.

| Artifact | Type | Key Details |
|---|---|---|
| `Navbar` | Standalone Component | Global nav using `RouterLink` + `RouterLinkActive` for Home and Products links |
| `StarComponent` (`pm-star`) | Standalone Component | Renders star rating via `@Input() rating` and `@Output() ratingClicked`; uses `OnChanges` to recalculate `cropWidth` |
| `ConvertToSpacesPipe` | Standalone Pipe | Replaces a character (e.g. `-`) with spaces in product code display |

---

## 6. Containerized Local Development

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
