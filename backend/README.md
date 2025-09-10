# Backend API (Express)

- Run: npm run dev:api
- Base URL: http://localhost:4000
- Auth: Bearer token required for write endpoints. Default token: demo-admin-token
- Env: set ADMIN_TOKEN to override default, MONGODB_URI to connect to MongoDB

Endpoints:
- GET /api/projects
- GET /api/projects/:slug
- POST /api/projects (auth)
- PUT /api/projects/:slug (auth)
- DELETE /api/projects/:slug (auth)
- POST /api/projects/upload (auth, multipart/form-data, field: file)
- POST /api/projects/:slug/upload (auth, multipart/form-data, field: file)
- POST /api/projects/:slug/upload-many (auth, multipart/form-data, fields: heroImage, logoImage, coverImage, coverImageWithLogo, gallery[], experienceImages[], modelImages[])

Uploads served at /uploads/* (project-specific files at /uploads/projects/:slug)