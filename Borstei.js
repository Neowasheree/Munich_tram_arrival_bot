// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: magic;
// Borstei_EN.js
// Scriptable script: Pull Borstei real-time shifts and notify locally (English version)

// 1. Configure site ID
let STOP_ID = "de:09162:305";

// 2. Construct the request URL (get the first 5 trains, trams and buses)
let url = `https://www.mvg.de/api/bgw-pt/v3/departures`
        + `?globalId=${encodeURIComponent(STOP_ID)}`
        + `&limit=5`
        + `&transportTypes=${encodeURIComponent("TRAM,BUS")}`;

// 3. Pull JSON
let req = new Request(url);
req.headers = { "Accept": "application/json" };
let data = await req.loadJSON();     // an array
let now  = Date.now();

// 4. Process the first 5 shifts and spell them into English lines
let lines = data.slice(0, 5).map(d => {
  // Calculate the countdown
  let departMs = d.realtimeDepartureTime;
  let mins      = Math.round((departMs - now) / 60000);
  // Format into HH:mm (24h)
  let timeStr   = new Date(departMs)
                    .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  // Status text
  let status = d.cancelled
    ? "❌ Cancelled"
    : d.delayInMinutes > 0
      ? `Delayed ${d.delayInMinutes} min`
      : "On time";
  // Last line
  return `${d.transportType}${d.label} -> ${d.destination}: `
       + `${timeStr} (in ${mins} min) ${status}`;
}).join("\n");

// 5. Send local notification
let n = new Notification();
n.title = "Borstei Real-time Departures";
n.body  = lines;
await n.schedule();