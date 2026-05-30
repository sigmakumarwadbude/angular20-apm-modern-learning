# angular20-apm-modern-learning
Modern Angular 20 learning journey based on APM application using Standalone Components, Signals, Docker and enterprise architecture.
## Architecture Overview

![Angular 20 APM Modern Learning Enterprise Architecture Diagram](docs/images/architecture_diagram.png)

This project uses a modular, enterprise-grade architecture pattern designed around Standalone Components, feature boundaries, and reactive unidirectional data flow powered by Angular Signals.

For step-by-step guides, codebase directories, and interactive diagrams, please check the dedicated technical guides under **[docs/architecture/](docs/architecture/)**:

- 🏗️ **[Current Architecture](docs/architecture/current-architecture.md)**: Explore the active system layout, Signal-based state flows, and localized container structures.
- 🎯 **[Target Architecture](docs/architecture/target-architecture.md)**: Roadmap detailing NgRx SignalStores, API interceptors, dynamic security guards, and production container layers.
- 🧭 **[Routing & Navigation Flow](docs/architecture/routing-flow.md)**: Understand lazy loading bundles, async routing configurations, and step-by-step navigation lifecycles.
- 📦 **[Product Feature Architecture](docs/architecture/product-feature-architecture.md)**: Comprehensive design spec for the planned Products module, including Smart/Dumb divisions and computed state filtering.

```mermaid
graph TD
    subgraph Shell [Application Shell]
        App[App Shell] --> Routes[Global Routes]
    end

    subgraph HomeFeature [Home / Dashboard Feature]
        Routes -->|Lazy Load| FR[Feature Routes]
        FR --> Page[Page Component - Smart]
        Page --> Serv[Service - State Store]
        Page --> Comp[Presentational Components - Dumb]
        Serv -.->|Signals Reactive Stream| Page
    end

    subgraph DevEnv [Development Environment]
        Dev([Developer Workspace]) <-->|Volume Mount| Docker[Docker Container Dev Server]
    end
```

## Setup Instructions

### Prerequisites
- Node.js 20.x or later
- npm 10.x or later
- Optional: Docker and Docker Compose, if you want to run the app in a container

### Local development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Angular development server:
   ```bash
   npm start
   ```
3. Open the app in your browser:
   ```
   http://localhost:4200
   ```

### Run tests
```bash
npm test
```

### Docker
1. Build and start the container:
   ```bash
   docker compose up --build
   ```
2. Open the app in your browser:
   ```
   http://localhost:4200
   ```

### Notes
- The repo uses Angular 20 and standalone components.
- `npm start` runs `ng serve`.
- Docker exposes port `4200` and mounts the app source for live reload.
