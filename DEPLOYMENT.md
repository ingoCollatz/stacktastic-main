# Deployment Guide

This guide covers deploying your Stacktastic portfolio application using Docker and docker-compose with Traefik.

## Prerequisites

- Docker and Docker Compose installed
- Traefik reverse proxy running
- cap.js CAPTCHA server running at `https://capjs.stacktastic.dev`

## Environment Variables

Create environment files for your deployment environments. All variables from `.env.example` are required:

### For Production (.env.prod)

```bash
# Email Configuration
MAIL_HOST=mail.gandi.net
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=info@stacktastic.dev
MAIL_PASS=your-email-password
CONTACT_RECEIVER=info@stacktastic.dev

# cap.js CAPTCHA Configuration
CAPTCHA_SECRET=your-cap-server-secret
VITE_CAPTCHA_SECRET=your-cap-server-secret

# Security Configuration
CSRF_SECRET=your-csrf-secret-key-here

# Docker Configuration
IMAGE_TAG=latest
```

### For Staging (.env.staging)

```bash
# Same as production but with staging-specific values
CONTACT_RECEIVER=staging@stacktastic.dev
# ... other variables
IMAGE_TAG=staging
```

## GitHub Actions Secrets

If using the automated deployment workflow (`.github/workflows/deploy.yml`), configure these secrets in your GitHub repository settings:

### Required Secrets

```bash
# Server Configuration
SERVER_HOST=your-server-ip-or-domain
SERVER_USER=your-ssh-username
SERVER_SSH_KEY=your-private-ssh-key

# Email Configuration
CONTACT_RECEIVER=info@stacktastic.dev
MAIL_HOST=mail.gandi.net
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=info@stacktastic.dev  
MAIL_PASS=your-email-password

# cap.js CAPTCHA Configuration
CAPTCHA_SECRET=your-cap-server-secret
VITE_CAPTCHA_SECRET=your-cap-server-secret

# Security Configuration (Optional)
CSRF_SECRET=your-csrf-secret-key-here
```

**To add secrets:** Go to GitHub → Your Repository → Settings → Secrets and variables → Actions → New repository secret

## Deployment

The application uses in-memory rate limiting, so no external dependencies are required:

```bash
# Production deployment
docker-compose -f docker-compose.main.yml --env-file .env.prod up -d

# Staging deployment
docker-compose -f docker-compose.staging.yml --env-file .env.staging up -d
```

## Building Images

Before deployment, build your Docker images:

```bash
# Build production image
docker build -t stacktastic-main:latest .

# Build staging image (if different)
docker build -t stacktastic-staging:staging .
```

## Deployment Commands

### Production

```bash
# Deploy to production
docker-compose -f docker-compose.main.yml --env-file .env.prod up -d

# View logs
docker-compose -f docker-compose.main.yml logs -f

# Update deployment
docker-compose -f docker-compose.main.yml --env-file .env.prod pull
docker-compose -f docker-compose.main.yml --env-file .env.prod up -d --force-recreate
```

### Staging

```bash
# Deploy to staging
docker-compose -f docker-compose.staging.yml --env-file .env.staging up -d

# View logs
docker-compose -f docker-compose.staging.yml logs -f stacktastic-staging
```

## SSL/TLS Configuration

The docker-compose files are configured for Traefik with automatic HTTPS:

- **Production**: `stacktastic.dev` and `www.stacktastic.dev`
- **Staging**: `staging.stacktastic.dev`

Ensure your Traefik instance has:

- Certificate resolver configured (`myresolver`)
- External network `web` created: `docker network create web`

## Health Checks

Monitor your deployment:

```bash
# Check if services are running
docker-compose -f docker-compose.main.yml ps

# Check application logs
docker-compose -f docker-compose.main.yml logs stacktastic-main
```

## Troubleshooting

### Rate Limiting Issues

Rate limiting uses in-memory storage and should work automatically. If you're experiencing issues:

- Check application logs for any rate limiting warnings
- Verify the application is receiving the correct client IP addresses

### CAPTCHA Issues

- Verify cap.js server is running at `https://capjs.stacktastic.dev`
- Check `CAPTCHA_SECRET` matches your cap.js server configuration
- Ensure `VITE_CAPTCHA_SECRET` is set for client-side widget

### Email Issues

- Test SMTP connection manually
- Check firewall settings for SMTP port (587)
- Verify email credentials in environment variables

### SSL/HTTPS Issues

- Ensure Traefik is running and configured
- Check Traefik logs: `docker logs traefik`
- Verify DNS points to your server

## Environment Variable Reference

| Variable              | Required | Description                                                 |
| --------------------- | -------- | ----------------------------------------------------------- |
| `MAIL_HOST`           | Yes      | SMTP server hostname                                        |
| `MAIL_PORT`           | Yes      | SMTP server port (usually 587)                              |
| `MAIL_SECURE`         | No       | Use TLS (false for STARTTLS)                                |
| `MAIL_USER`           | Yes      | SMTP username                                               |
| `MAIL_PASS`           | Yes      | SMTP password                                               |
| `CONTACT_RECEIVER`    | Yes      | Email address to receive contact form submissions           |
| `CAPTCHA_SECRET`      | Yes      | Secret key from cap.js server                               |
| `VITE_CAPTCHA_SECRET` | Yes      | Public key for cap.js widget (same as CAPTCHA_SECRET)       |
| `CSRF_SECRET`         | No       | Secret for CSRF protection (uses CAPTCHA_SECRET if not set) |
| `IMAGE_TAG`           | Yes      | Docker image tag for deployment                             |
