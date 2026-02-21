const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const HN = 'https://hacker-news.firebaseio.com/v0';

// Crypto Price API
app.post('/api/crypto-price', async (req, res) => {
  const coin = (req.body.coin || 'bitcoin').toLowerCase().replace(/\s/g, '-');
  const currency = (req.body.currency || 'usd').toLowerCase();

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}&include_24hr_change=true&include_market_cap=true`;
    const data = await fetch(url).then(r => r.json());

    if (!data[coin]) {
      return res.json({ error: `Coin '${coin}' not found. Try: bitcoin, ethereum, solana` });
    }

    const info = data[coin];
    res.json({
      coin,
      currency: currency.toUpperCase(),
      price: info[currency],
      change_24h: info[`${currency}_24h_change`]?.toFixed(2),
      market_cap: info[`${currency}_market_cap`],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hacker News Digest API
app.post('/api/hn-digest', async (req, res) => {
  const limit = Math.min(req.body.count || 5, 10);
  const category = req.body.category || 'top';

  try {
    const idsRes = await fetch(`${HN}/${category}stories.json`);
    const ids = (await idsRes.json()).slice(0, limit);

    const stories = await Promise.all(
      ids.map(id => fetch(`${HN}/item/${id}.json`).then(r => r.json()))
    );

    res.json({
      category,
      stories: stories.map((s, i) => ({
        rank: i + 1,
        title: s.title,
        url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
        score: s.score,
        by: s.by,
        comments: s.descendants || 0,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mood Playlist API
let tokenCache = { token: null, expires: 0 };

async function getSpotifyToken() {
  if (Date.now() < tokenCache.expires) return tokenCache.token;
  const creds = Buffer.from(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials',
  });
  const d = await r.json();
  tokenCache = { token: d.access_token, expires: Date.now() + d.expires_in * 1000 - 5000 };
  return tokenCache.token;
}

app.post('/api/mood-playlist', async (req, res) => {
  const { mood, genre = '' } = req.body;
  
  if (!process.env.SPOTIFY_ID || !process.env.SPOTIFY_SECRET) {
    return res.json({ error: 'Spotify credentials not configured' });
  }

  const query = `${mood} ${genre} playlist`.trim();
  const token = await getSpotifyToken();

  try {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=3`;
    const data = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json());

    const playlists = data.playlists?.items?.map(p => ({
      name: p.name,
      url: p.external_urls.spotify,
      tracks: p.tracks.total,
      owner: p.owner.display_name,
    })) || [];

    res.json({ mood, playlists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`All apps running on ${PORT}`));
