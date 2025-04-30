# Munich Tram Arrival Notifier

A simple Node.js/Scriptable project to fetch and notify upcoming tram departures from Munich's MVG API.

## Features

- Query real-time tram departures for a given stop ID.
- Output via console, Telegram, PushPlus, or iOS Scriptable notifications.
- Support scheduled runs via GitHub Actions or on-demand via Shortcuts.

## Repository Structure

```plaintext
├── tram_notifier.js    # Core Node.js notifier script
├── package.json        # Dependencies and scripts
├── README.md           # Project overview and usage
└── .github/
    └── workflows/
        └── tram.yml    # GitHub Actions schedule for automated notifications
```

## Getting Started

### 1. Create the GitHub Repository

1. Log in to GitHub and click **New** repository.
2. Name it `munich-tram-notifier` (or your preferred name).
3. Initialize with a `README.md` and `.gitignore` for Node.

### 2. Clone Locally
```bash
git clone https://github.com/<your‑org>/munich-tram-notifier.git
cd munich-tram-notifier
```

### 3. Install Dependencies
```bash
npm init -y
npm install node-fetch
```

### 4. Configure Secrets
In GitHub ▶️ Settings ▶️ Secrets and variables ▶️ Actions, add:
- `TRAM_STOP_ID` – MVG stop globalId (e.g. `de:09162:305`)
- `TELEGRAM_TOKEN` & `TELEGRAM_CHAT_ID` (if using Telegram)
- or `PUSHPLUS_TOKEN` (if using PushPlus)

### 5. Core Script (`tram_notifier.js`)
```js
// tram_notifier.js
typeof fetch === 'undefined' && (global.fetch = require('node-fetch'));
const STOP_ID = process.env.TRAM_STOP_ID;
async function main() {
  const url = `https://www.mvg.de/api/bgw-pt/v3/departures?globalId=${encodeURIComponent(STOP_ID)}&transportTypes=TRAM&limit=5`;
  const res = await fetch(url);
  const list = await res.json();
  const lines = list.map(i => `${i.label} → ${new Date(i.realtimeDepartureTime).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})}`);
  // Send via Telegram
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: lines.join("\n") })
  });
}
main();
```

### 6. GitHub Actions Workflow (`.github/workflows/tram.yml`)
```yaml
name: Munich Tram Notifier
on:
  schedule:
    - cron: '*/15 * * * *'  # every 15 minutes
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run notifier
        env:
          TRAM_STOP_ID: ${{ secrets.TRAM_STOP_ID }}
          TELEGRAM_TOKEN: ${{ secrets.TELEGRAM_TOKEN }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
        run: node tram_notifier.js
```

## Usage on iOS (Scriptable)

Copy `tram_notifier.js` into Scriptable, adapt fetch and notification code, then run via Shortcuts with a **Quick Look** or **Show Result** to display departures.

---

Happy commuting! 🚋

