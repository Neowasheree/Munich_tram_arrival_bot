# Munich Transit Notifier (iOS)

A lightweight iOS solution using **Scriptable** and **Shortcuts** to fetch and display upcoming tram and bus departures from Munich’s MVG API.

## Prerequisites

- **Scriptable** app on iOS
- **Shortcuts** app
- MVG stop global ID (e.g. `de:09162:305`)

## Repository Structure

```
└── README.md                   # This overview
    └── Borstei.js              # Scriptable departure notifier script
```

## Installation

1. **Clone or download** this repo to your Mac/PC.
2. **Open** `Borstei.js` and **copy** its contents.
3. **Open Scriptable** on iOS, tap **+**, name script e.g. **Borstei** and paste code.
4. Grant **Network** and **Notification** permissions when prompted.

## Script Details (`Borstei.js`)

- **Configuration**:
  ```js
  let STOP_ID = "de:09162:305"; // MVG stop ID
  ```
- **Fetch URL** pulls first 5 departures for TRAM and BUS:
  ```js
  let url = `https://www.mvg.de/api/bgw-pt/v3/departures?globalId=${encodeURIComponent(STOP_ID)}&limit=5&transportTypes=TRAM,BUS`;
  ```
- **Data Processing**:
  - Calculates countdown minutes
  - Formats departure time in `HH:mm` (en-GB locale)
  - Determines status: On time / Delayed X min / Cancelled
  - Builds lines like:
    ```text
    TRAM20 -> Westfriedhof: 15:30 (in 5 min) On time
    ```
- **Notification**: Sends a local iOS notification with title **"Borstei Real-time Departures"** and body containing the formatted lines.

## Shortcut Setup

1. **Open Shortcuts** and create a new shortcut named **Borstei ETA**.
2. Add **Run Script** action:
   - App: **Scriptable**
   - Script: **Borstei**
   - Turn **Off** "Show While Running"
   - Enable **Pass Output to Shortcut** (even if script does not return output, keep enabled).
3. **Save** the shortcut.

## Usage

- **In Scriptable**: Tap **Borstei** script → receives a local notification with next departures.
- **In Shortcuts**: Run **Borstei ETA** from Shortcuts or via Siri → script runs and schedules a notification.

## Customization

- Change `STOP_ID` to any other MVG stop global ID.
- Adjust `limit` value in `Borstei.js` to fetch more or fewer departures.

---

Built with ❤️ using Scriptable & Shortcuts.
