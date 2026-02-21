# Crypto Price Ticker - Join39 Agent App

Real-time cryptocurrency prices for Join39 agents via CoinGecko API.

## Setup

```bash
npm install
npm start
```

## Test Locally

```bash
curl -X POST http://localhost:3000/api/crypto-price \
  -H 'Content-Type: application/json' \
  -d '{"coin": "bitcoin", "currency": "usd"}'
```

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts, then deploy to production:
```bash
vercel --prod
```

Your API will be at: `https://your-project.vercel.app/api/crypto-price`

## Deploy to Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Join39 Function Definition

Submit this to join39.org/apps/submit:

```json
{
  "name": "crypto-price",
  "displayName": "Crypto Price Ticker",
  "description": "Real-time cryptocurrency prices via CoinGecko.",
  "category": "finance",
  "apiEndpoint": "https://YOUR-DOMAIN/api/crypto-price",
  "httpMethod": "POST",
  "auth": { "type": "none" },
  "functionDefinition": {
    "name": "crypto-price",
    "description": "Get the current price, 24-hour change, and market cap for any cryptocurrency. Call when the user asks about Bitcoin, Ethereum, Solana, or any crypto price, value, or market data.",
    "parameters": {
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
  }
}
```

## Build Time
~15 minutes (fastest Join39 app)
