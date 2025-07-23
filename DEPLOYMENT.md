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

# Redis Configuration (optional - will use Docker service if not specified)
# REDIS_URL=redis://external-redis:6379

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

# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379
```

**To add secrets:** Go to GitHub → Your Repository → Settings → Secrets and variables → Actions → New repository secret

## Deployment Options

### Option 1: With Built-in Redis (Recommended)

The docker-compose files include a Redis service for rate limiting:

```bash
# Production deployment
docker-compose -f docker-compose.main.yml --env-file .env.prod up -d

# Staging deployment
docker-compose -f docker-compose.staging.yml --env-file .env.staging up -d
```

### Option 2: With External Redis

If you have Redis running elsewhere, remove the Redis service from docker-compose files and set `REDIS_URL`:

1. Edit `docker-compose.main.yml` and `docker-compose.staging.yml`
2. Remove the entire `redis:` service section
3. Remove `depends_on: - redis` from the main service
4. Set `REDIS_URL` in your environment file

### Option 3: Without Redis (No Rate Limiting)

Simply don't set `REDIS_URL` - the application will run without rate limiting:

```bash
# Remove REDIS_URL from your .env file
# The application will log warnings but function normally
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

# Check Redis logs (if using built-in Redis)
docker-compose -f docker-compose.main.yml logs redis
```

## Backup Redis Data

If using the built-in Redis service, backup the data volume:

```bash
# Create backup
docker run --rm -v stacktastic-main_redis_data:/data -v $(pwd):/backup alpine tar czf /backup/redis-backup.tar.gz -C /data .

# Restore backup
docker run --rm -v stacktastic-main_redis_data:/data -v $(pwd):/backup alpine tar xzf /backup/redis-backup.tar.gz -C /data
```

## Troubleshooting

### Rate Limiting Not Working

- Check if Redis is running: `docker-compose logs redis`
- Verify `REDIS_URL` environment variable
- Check application logs for Redis connection errors

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
| `REDIS_URL`           | No       | Redis connection URL (uses Docker service if not set)       |
| `IMAGE_TAG`           | Yes      | Docker image tag for deployment                             |
