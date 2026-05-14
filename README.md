# MatrixQuant Frontend

Premium Matrix Factorization & Statistical Intelligence Platform built with Next.js 16 and Bun.

## 🚀 Features

- **QR Factorization**: High-performance decomposition using the Go backend.
- **Statistical Analysis**: Real-time metrics (Max, Min, Avg, Sum) via the Node.js backend.
- **Dual Authentication**: Unified login/register flow for both systems.
- **Glassmorphism Design**: Modern, premium UI with high-end aesthetics.
- **Session Persistence**: Stay logged in across page refreshes.

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed locally.
- Backends (Go & Node) running on their respective ports.

### Installation

1. Install dependencies:
   ```bash
   bun install
   ```

2. Configure environment variables:
   Create a `.env` file based on `.env.local.example`:
   ```env
   NEXT_PUBLIC_GO_API_URL=http://localhost:3030
   NEXT_PUBLIC_NODE_API_URL=http://localhost:3050
   ```

3. Run the development server:
   ```bash
   bun run dev
   ```

## 🐳 Docker Deployment

### Development Mode (with Hot-Reload)
To run the app in development mode inside a container:
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production Mode (Optimized)
To build and run the production-ready image:
```bash
docker compose up -d --build
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 📄 License

&copy; 2026 Pholguinc. All rights reserved.
