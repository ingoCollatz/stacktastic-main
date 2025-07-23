# Stacktastic

My personal portfolio site built with modern web technologies.

## About

A portfolio and project showcase built with SvelteKit, TypeScript, and Tailwind CSS. Containerized with Docker and deployed on Hetzner with Traefik. Features a secure contact form with CAPTCHA protection and rate limiting.

**Note**: Requires a CAPTCHA server ([cap.js](https://github.com/tiagorangel1/cap)) for the contact form functionality.

## Setup

### Environment Variables

Copy `.env.example` to `.env` and add your configuration:

```bash
# Required
CAPTCHA_SECRET=your-cap-server-secret  # From your cap.js server
MAIL_HOST=smtp.your-provider.com
MAIL_USER=your-email@domain.com
MAIL_PASS=your-email-password
CONTACT_RECEIVER=contact@yourdomain.com

# Optional - for rate limiting
REDIS_URL=redis://localhost:6379
```

### Quick Start with Redis (Optional)

If you want rate limiting for the contact form:

```bash
# Start Redis
docker run --name redis -d -p 6379:6379 redis:alpine
```

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/) (optional)
- [cap.js server](https://github.com/tiagorangel1/cap) (for contact form CAPTCHA)

### Installation

```bash
git clone https://github.com/ingoCollatz/stacktastic-main.git
cd stacktastic-main
npm install
```

### Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### Testing

```bash
npm test                    # Run all tests
npm test security          # Security tests
npm test rate-limiting     # Rate limiting tests
```

### Building

```bash
npm run build
```

### Docker

```bash
# Development
docker-compose -f docker-compose.main.yml up

# Production
docker build -t stacktastic .
docker run -p 3000:3000 stacktastic
```

> **Note**: The docker-compose files are designed for use with a [Traefik](https://traefik.io/) reverse proxy setup and support automatic HTTPS and domain routing.

## Tech Stack

- **SvelteKit** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **cap.js** - CAPTCHA server
- **Redis** - Rate limiting (optional)
- **Docker** - Containerization
- **Traefik** - Reverse proxy

## License

MIT
