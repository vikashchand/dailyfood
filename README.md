# Manya 🌻 × Vikash 🌙 Lifestyle Tracker

Full-stack daily tracker using:
- Frontend: `index.html`
- Backend: Node.js Vercel serverless functions
- Database: MongoDB Atlas
- Deployment: Vercel

## Features
Food for breakfast, morning snacks, lunch, evening snacks, dinner and fruit; water amount + litres/glasses; 0–10 rating; notes; edit; delete; date navigation; date-range history; Manya/Vikash/combined averages; PDF export.

## MongoDB
Default database: `lifestyle`
Default collection: `daily_records`

Set these Vercel environment variables:
- `MONGODB_URI`
- `MONGODB_DB=lifestyle`
- `MONGODB_COLLECTION=daily_records`

Never put `MONGODB_URI` inside `index.html` or commit it to Git. If a real MongoDB password has previously been exposed, rotate it before deployment.

## Deploy
1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Add the three environment variables in Vercel Project Settings → Environment Variables.
4. Deploy.

For local development:
```bash
npm install
npm run dev
```

The Vercel API routes are:
- `GET /api/days/YYYY-MM-DD`
- `PUT /api/days/YYYY-MM-DD`
- `DELETE /api/days/YYYY-MM-DD`
- `GET /api/days?from=YYYY-MM-DD&to=YYYY-MM-DD`

## Important
There is no authentication in this starter. Anyone who can access the deployed URL can call the API. Add authentication before using it for sensitive/private data.
