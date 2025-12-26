This file provides guidance for AGENT AI when working with code in this repository.

## Project Overview
This a project to build a webapp that enables user to preview the html format text on the browser window.
- On the left area of the page, there is a text box where user can enter the entire html text.
- On the right area of the page, there is a preview pane that shows preview of html.
  - Also implement realtime update of preview if possible
- User can save the app as html file from "Save HTML" kind of function.
- Sometimes user uses PyScript

## Technology Stack

- **Frontend**: Nextjs(React)
- **Backend**: FastAPI with Python 3.12+
- **Package Management**: uv for Python, pnpm for Node.js
- **Database**: SQLite (operated by SQLAlchemy ORM)
- **Deployment**: Docker Compose
- **Reverse Proxy**: Nginx
- **Environment Variables Integration**: dotenv

### Another Requirements
- configuration parameter needs to be prepared for proxy server and no proxy settings for when required
- Test-Driven Development needs to be applied.

## Performance Considerations

- **Frontend**: Use Next's built-in performance optimizations, lazy load components

## Testing Strategy

- **Backend**: Pytest for API endpoints, SQLAlchemy model tests
- **Frontend**: Vitest for component testing, E2E tests for critical user flows
- **Integration**: Test API-frontend integration, database migrations

# Deploy
docker copose up -d

# Attach to the backend container
docker compose exec backend bash

# Execute Python scripts with uv
uv run script_name.py

# Examples:
uv run test_dynamodb.py
uv run init_db.py
uv run pytest tests/

This ensures the Python environment has access to all dependencies and the correct database connections configured in the Docker environment.
