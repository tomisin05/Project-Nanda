const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/crypto-price', async (req, res) => {
  const coin = (req.body.coin || 'bitcoin').toLowerCase().replace(/\s/g, '-');
  const currency = (req.body.currency || 'usd').toLowerCase();

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price` +
                `?ids=${coin}&vs_currencies=${currency}` +
                `&include_24hr_change=true&include_market_cap=true`;
    const data = await fetch(url).then(r => r.json());

    if (!data[coin]) {
      return res.json({ error: `Coin '${coin}' not found. Try: bitcoin, ethereum, solana` });
    }

    const info = data[coin];
    res.json({
      coin,
      currency: currency.toUpperCase(),
      price:       info[currency],
      change_24h:  info[`${currency}_24h_change`]?.toFixed(2),
      market_cap:  info[`${currency}_market_cap`],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log('Crypto ticker running on port 3000'));
}

module.exports = app;
