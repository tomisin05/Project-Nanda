# Hacker News Digest - Join39 Agent App

Get top stories from Hacker News. No API key needed.

## Deploy to Vercel

```bash
cd hn-digest
npm install
vercel --prod
```

## Test

```bash
curl -X POST https://YOUR-DOMAIN.vercel.app/api/hn-digest \
  -H 'Content-Type: application/json' \
  -d '{"count": 5, "category": "top"}'
```

## Submit to join39.org/apps/submit

**Basic Information:**
- **Display Name:** Hacker News Digest
- **App Name:** hn-digest
- **Description:** Fetch top stories from Hacker News. Great for tech news.
- **Version:** 1.0.0
- **Category:** Utilities
- **API Endpoint:** https://YOUR-DOMAIN.vercel.app/api/hn-digest
- **HTTP Method:** POST
- **Authentication:** None

**Function Definition:**
- **Description for AI:** Get the top, new, best, ask, or show stories from Hacker News. Call when the user asks what is trending in tech, what is popular on HN, or wants to see tech news headlines. Returns title, URL, score, comments.

- **Parameters (JSON Schema):**
```json
{
  "type": "object",
  "properties": {
    "count": {
      "type": "number",
      "description": "Number of stories (1-10, default 5)"
    },
    "category": {
      "type": "string",
      "enum": ["top", "new", "best", "ask", "show"],
      "description": "Which feed: top (default), new, best, ask, or show"
    }
  },
  "required": []
}
```

## Build Time
~20 minutes
