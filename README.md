# Stacktastic

A modern web application designed for rapid development, easy deployment, and maintainable code.

## About

Stacktastic is a personal portfolio site and project showcase built with SvelteKit, TypeScript, and Tailwind — containerized with Docker and deployed using Traefik on a Hetzner server.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optional, for containerized workflows)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ingoCollatz/stacktastic-main.git
   cd stacktastic-main
   ```
2. Install dependencies (choose one):
   ```bash
   yarn install
   ```

### Development

To start the development server with hot reloading:

```bash
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Linting

To check code quality with ESLint:

```bash
yarn lint
```

### Building for Production

To build the app for production:

```bash
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

> Note: The provided docker-compose.\*.yml files are designed for use with a [Traefik](https://traefik.io/) reverse proxy setup.
> They support automatic HTTPS and domain routing.

### Deployment

Automated deployment is configured via GitHub Actions (`.github/workflows/deploy.yml`).

## License

MIT
