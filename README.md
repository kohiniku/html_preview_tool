## HTML Preview Tool

Full-stack web app for previewing HTML in real time with a client-side download option.

### Features
- Split view editor and live preview
- Client-side "Save HTML" download
- FastAPI backend with health check

### Local Development

#### Backend (FastAPI)
```bash
uv run uvicorn app.main:app --reload --port 8000 --app-dir backend
```

Run backend tests:
```bash
uv run pytest
```

#### Frontend (Next.js)
```bash
cd frontend
pnpm install
pnpm dev
```

Run frontend tests:
```bash
cd frontend
pnpm test
```

### Docker
```bash
cp .env.example .env
docker compose up -d
```

The app is available via Nginx on `http://localhost/`.

### Environment Variables
- `DATABASE_URL`: SQLite connection string
- `PROXY_URL`: outbound proxy URL (optional)
- `NO_PROXY`: comma-separated hosts to bypass proxy
