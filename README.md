# Stacktastic

A modern web application designed for rapid development, easy deployment, and maintainable code.



## Tech Stack
- **SvelteKit** for fast, reactive web UI
- **Tailwind CSS** for utility-first styling
- **TypeScript** for type safety and better developer experience
- **Component-based architecture** (see `src/lib/components`)
- **Static assets** served from the `static/` directory
- **ESLint** for code quality and consistency
- **Docker** and **docker-compose** for containerized development and deployment
- **CI/CD** with GitHub Actions for automated deployment
- **Vite** for lightning-fast builds and HMR
- **Yarn** support for dependency management

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for containerized workflows)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd stacktastic-main-clean2
   ```
2. Install dependencies (choose one):
   ```bash
   npm install
   # or
   yarn install
   ```

### Development
To start the development server with hot reloading:
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Linting
To check code quality with ESLint:
```bash
npm run lint
# or
yarn lint
```

### Building for Production
To build the app for production:
```bash
npm run build
# or
yarn build
```

### Running with Docker
Build and run the app using Docker:
```bash
docker build -t stacktastic .
docker run -p 3000:3000 stacktastic
```
Or use docker-compose for multi-service setups:
```bash
docker-compose -f docker-compose.main.yml up --build
```

### Deployment
Automated deployment is configured via GitHub Actions (`.github/workflows/deploy.yml`).

### Configuration
- Tailwind: `tailwind.config.js`
- SvelteKit: `svelte.config.js`
- Vite: `vite.config.ts`
- TypeScript: `tsconfig.json`
- ESLint: `eslint.config.js`
- Docker: `Dockerfile`, `docker-compose.*.yml`

## Project Structure
```
stacktastic-main-clean2/
├── src/
│   ├── lib/components/   # Svelte components
│   └── routes/           # SvelteKit routes
├── static/               # Static assets
├── Dockerfile
├── docker-compose.main.yml
├── docker-compose.staging.yml
├── tailwind.config.js
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .github/workflows/deploy.yml
├── yarn.lock
├── package.json
└── ...
```

## License
[MIT](LICENSE)
