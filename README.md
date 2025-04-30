# Munich Tram Arrival Notifier (iOS)

A lightweight iOS solution using **Scriptable** and **Shortcuts** to fetch and display upcoming tram departures from Munich’s MVG API.

## Prerequisites

- **Scriptable** app installed on iOS
- **Shortcuts** app (built-in)
- MVG stop ID (e.g. `de:09162:305`)

## Repository Structure

```
└── README.md                   # This overview
    └── tram_notifier.js        # Scriptable script
```

## Installation

1. **Clone or download** this repo to your Mac/PC.
2. **Open** the `tram_notifier.js` file and **copy** its contents.
3. **Open Scriptable** on your iOS device, tap **+** to create a new script, paste in the code, name it e.g. **Munich Tram**.
4. **Grant necessary permissions** when prompted (network access).

## Script Explanation (`tram_notifier.js`)

- **Fetches** MVG departures:
  ```js
  const stopId = "de:09162:305";
  const url = `https://www.mvg.de/api/bgw-pt/v3/departures?globalId=${encodeURIComponent(stopId)}&transportTypes=TRAM&limit=5`;
  ```
- **Parses** JSON, formats each line label and departure time in **HH:mm** (HKT).
- **Returns** a single output string via `Script.setShortcutOutput(output)` when run from Shortcuts.
- **Displays** a Quick Look preview when run in-app.

## Shortcut Setup

1. **Open Shortcuts** and create a new shortcut named **Tram ETA**.
2. Add **Run Script** action:
   - App: **Scriptable**
   - Script: **Munich Tram**
   - Turn **Off** "Show While Running"
   - Enable **Pass Output to Shortcut**
3. Add **Quick Look** (or **Show Result**) action:
   - Input: **Shortcut Input**
4. **Save** the shortcut.

## Usage

- **In Scriptable**: Tap the script → shows a scrollable Quick Look of next tram times.
- **In Shortcuts**: Run **Tram ETA** from the Shortcuts app, Today Widget, or via Siri voice command—displays full list.

## Customization

- Change `stopId` in the script to any MVG stop globalId.
- Adjust `limit` to show more or fewer upcoming departures.

---

Built with ❤️ using Scriptable & Shortcuts.

