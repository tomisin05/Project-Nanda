# Join39 Hackathon Apps - All in One

Three apps in one deployment. Deploy once, submit three times.

## Deploy to Vercel

```bash
npm install
vercel --prod
```

Your base URL: `https://your-project.vercel.app`

## APIs Available

1. `/api/crypto-price` - Crypto prices
2. `/api/hn-digest` - Hacker News stories
3. `/api/mood-playlist` - Spotify playlists (needs env vars)

## Test

```bash
# Crypto
curl -X POST https://your-url.vercel.app/api/crypto-price -H "Content-Type: application/json" -d "{\"coin\":\"bitcoin\"}"

# HN
curl -X POST https://your-url.vercel.app/api/hn-digest -H "Content-Type: application/json" -d "{\"count\":3}"

# Mood (after setting Spotify env vars)
curl -X POST https://your-url.vercel.app/api/mood-playlist -H "Content-Type: application/json" -d "{\"mood\":\"happy\"}"
```

## Spotify Setup (for mood-playlist)

1. Go to developer.spotify.com/dashboard
2. Create app, copy Client ID and Secret
3. Set in Vercel:
```bash
vercel env add SPOTIFY_ID
vercel env add SPOTIFY_SECRET
```

---

## Submit to join39.org/apps/submit

### App 1: Crypto Price Ticker

- **Display Name:** Crypto Price Ticker
- **App Name:** crypto-price
- **Description:** Real-time cryptocurrency prices via CoinGecko.
- **Category:** Finance
- **API Endpoint:** https://YOUR-URL.vercel.app/api/crypto-price
- **HTTP Method:** POST
- **Authentication:** None
- **Description for AI:** Get the current price, 24-hour change, and market cap for any cryptocurrency. Call when the user asks about Bitcoin, Ethereum, Solana, or any crypto price, value, or market data.
- **Parameters:**
```json
{
  "type": "object",
  "properties": {
    "coin": {
      "type": "string",
      "description": "CoinGecko coin ID: bitcoin, ethereum, solana, dogecoin, etc."
    },
    "currency": {
      "type": "string",
      "description": "Fiat currency code: usd (default), eur, gbp, jpy"
    }
  },
  "required": ["coin"]
}
```

### App 2: Hacker News Digest

- **Display Name:** Hacker News Digest
- **App Name:** hn-digest
- **Description:** Fetch top stories from Hacker News. Great for tech news.
- **Category:** Utilities
- **API Endpoint:** https://YOUR-URL.vercel.app/api/hn-digest
- **HTTP Method:** POST
- **Authentication:** None
- **Description for AI:** Get the top, new, best, ask, or show stories from Hacker News. Call when the user asks what is trending in tech, what is popular on HN, or wants to see tech news headlines. Returns title, URL, score, comments.
- **Parameters:**
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

### App 3: Mood Playlist Finder

- **Display Name:** Mood Playlist Finder
- **App Name:** mood-playlist
- **Description:** Find Spotify playlists that match a mood or feeling.
- **Category:** Fun
- **API Endpoint:** https://YOUR-URL.vercel.app/api/mood-playlist
- **HTTP Method:** POST
- **Authentication:** None
- **Description for AI:** Find Spotify playlists that match the user's mood or energy. Call when user wants music, mentions how they feel, or asks for a playlist. Returns 3 playlist names and direct Spotify links.
- **Parameters:**
```json
{
  "type": "object",
  "properties": {
    "mood": {
      "type": "string",
      "description": "How the user feels: happy, sad, focused, energetic, chill, etc."
    },
    "genre": {
      "type": "string",
      "description": "Optional music genre: pop, jazz, lo-fi, rock, classical"
    }
  },
  "required": ["mood"]
}
```
