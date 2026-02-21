const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const HN = 'https://hacker-news.firebaseio.com/v0';

app.post('/api/hn-digest', async (req, res) => {
  const limit = Math.min(req.body.count || 5, 10);
  const category = req.body.category || 'top';

  try {
    const idsRes = await fetch(`${HN}/${category}stories.json`);
    const ids = (await idsRes.json()).slice(0, limit);

    const stories = await Promise.all(
      ids.map(id =>
        fetch(`${HN}/item/${id}.json`).then(r => r.json())
      )
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HN Digest running on ${PORT}`));
