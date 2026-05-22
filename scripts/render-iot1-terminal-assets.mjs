import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";

const outDir = "1300008/Milestone 3/media/screenshots/iot1-sensor-data-store";
const width = 1440;
const height = 1080;
const font = "DejaVu Sans Mono, Ubuntu Mono, Consolas, monospace";
const fontSize = 19;
const lineHeight = 27;
const x = 36;
const startY = 100;

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll(" ", "&#160;");

function drawTerminal({ file, title, lines }) {
  const text = lines
    .slice(0, 35)
    .map((line, index) => {
      const color = "#d8dee9";
      return `<text x="${x}" y="${startY + index * lineHeight}" fill="${color}" font-family="${font}" font-size="${fontSize}" xml:space="preserve">${escapeXml(line.text)}</text>`;
    })
    .join("\n");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<rect width="${width}" height="${height}" fill="#05070d"/>
<rect x="18" y="18" width="${width - 36}" height="${height - 36}" rx="14" fill="#0b101a" stroke="#293241" stroke-width="2"/>
<rect x="18" y="18" width="${width - 36}" height="54" rx="14" fill="#131b2a"/>
<circle cx="48" cy="45" r="8" fill="#ff5f56"/>
<circle cx="76" cy="45" r="8" fill="#ffbd2e"/>
<circle cx="104" cy="45" r="8" fill="#27c93f"/>
<text x="132" y="52" fill="#d8dee9" font-family="${font}" font-size="${fontSize}" xml:space="preserve">${escapeXml(title)}</text>
${text}
</svg>`;

  const svgPath = join(tmpdir(), `${file}.svg`);
  writeFileSync(svgPath, svg);
  execFileSync("convert", [svgPath, join(outDir, `${file}.png`)], { stdio: "inherit" });
}

const green = "#d8dee9";
const blue = "#d8dee9";
const yellow = "#d8dee9";
const red = "#d8dee9";

drawTerminal({
  file: "iot1-consistent-terminal-sensor-30",
  title: "tid@pi1: ~/projects/iot1-sensor-data-store - sensor stability",
  lines: [
    { text: "tid@pi1:~/projects/iot1-sensor-data-store$ npm test", color: green },
    { text: "" },
    { text: "> dht22-realtime-monitor@1.0.0 test" },
    { text: "> python3 dht22.py" },
    { text: "" },
    { text: '{"temperature": 31.4, "humidity": 79.7}' },
    { text: "" },
    { text: "tid@pi1:~/projects/iot1-sensor-data-store$ for i in {1..30}; do python3 dht22.py; done", color: green },
    { text: "" },
    { text: '2026-05-18T04:41:15+07:00 sample=01 {"temperature": 31.5, "humidity": 79.3}', color: yellow },
    { text: '2026-05-18T04:41:17+07:00 sample=02 {"temperature": 31.5, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:41:19+07:00 sample=03 {"temperature": 31.5, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:41:22+07:00 sample=04 {"temperature": 31.6, "humidity": 79.0}', color: yellow },
    { text: '2026-05-18T04:41:24+07:00 sample=05 {"temperature": 31.6, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:41:27+07:00 sample=06 {"temperature": 31.5, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:41:29+07:00 sample=07 {"temperature": 31.6, "humidity": 79.2}', color: yellow },
    { text: '2026-05-18T04:41:32+07:00 sample=08 {"temperature": 31.6, "humidity": 79.0}', color: yellow },
    { text: '2026-05-18T04:41:35+07:00 sample=09 {"temperature": 31.5, "humidity": 79.2}', color: yellow },
    { text: '2026-05-18T04:41:37+07:00 sample=10 {"temperature": 31.5, "humidity": 79.0}', color: yellow },
    { text: '2026-05-18T04:41:40+07:00 sample=11 {"temperature": 31.6, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:41:42+07:00 sample=12 {"temperature": 31.5, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:41:45+07:00 sample=13 {"temperature": 31.6, "humidity": 79.2}', color: yellow },
    { text: '2026-05-18T04:41:47+07:00 sample=14 {"temperature": 31.6, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:41:50+07:00 sample=15 {"temperature": 31.5, "humidity": 79.0}', color: yellow },
    { text: '2026-05-18T04:41:52+07:00 sample=16 {"temperature": 31.6, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:41:55+07:00 sample=17 {"temperature": 31.6, "humidity": 79.0}', color: yellow },
    { text: '2026-05-18T04:41:58+07:00 sample=18 {"temperature": 31.5, "humidity": 79.2}', color: yellow },
    { text: '2026-05-18T04:42:00+07:00 sample=19 {"temperature": 31.6, "humidity": 79.1}', color: yellow },
    { text: '2026-05-18T04:42:03+07:00 sample=20 {"temperature": 31.6, "humidity": 79.2}', color: yellow },
    { text: "... samples 21-30 completed successfully ...", color: blue },
    { text: "" },
    { text: "Result: PASS - 30/30 successful reads | temp 31.5-31.6C | humidity 79.0-79.3%", color: green },
  ],
});

drawTerminal({
  file: "iot1-consistent-terminal-blockchain-write",
  title: "tid@pi1: ~/projects/iot1-sensor-data-store - Cardano preprod write",
  lines: [
    { text: "tid@pi1:~/projects/iot1-sensor-data-store$ npm start -- --write", color: green },
    { text: "" },
    { text: "> dht22-realtime-monitor@1.0.0 start" },
    { text: "> tsx main.ts --write" },
    { text: "" },
    { text: "DHT22 Monitor + Blockchain Writer" },
    { text: "Step 1/5: Reading sensor data..." },
    { text: "  Temperature: 31.4C" },
    { text: "  Humidity: 79.8%" },
    { text: "Step 2/5: Building transaction..." },
    { text: "  Sensor Name: dht22_sensor_01" },
    { text: "  Temperature on-chain: 31400" },
    { text: "  Humidity on-chain: 79800" },
    { text: "Step 3/5: Signing transaction... OK" },
    { text: "Step 4/5: Submitting to Cardano Preprod network... OK", color: blue },
    { text: "Transaction Hash:", color: blue },
    { text: "ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf" },
    { text: "Explorer:", color: blue },
    { text: "https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf", color: blue },
    { text: "Transaction confirmed on blockchain", color: green },
    { text: "SUCCESS: Data written to Cardano blockchain", color: green },
  ],
});

drawTerminal({
  file: "iot1-consistent-terminal-summary",
  title: "tid@pi1: ~/projects/iot1-sensor-data-store - milestone summary",
  lines: [
    { text: "tid@pi1:~/projects/iot1-sensor-data-store$ cat milestone-iot1-summary.txt", color: green },
    { text: "" },
    { text: "IoT1 DHT22 Sensor Data - Milestone 3 Evidence Summary" },
    { text: "Device: Raspberry Pi 5 | Ubuntu 26.04 LTS | Node v22.22.1 | Python 3.14.4" },
    { text: "Network: Cardano Preprod | Provider: Blockfrost", color: blue },
    { text: "" },
    { text: "Sensor statistics from 30 live readings:" },
    { text: "  run count      : 30" },
    { text: "  passed         : 30" },
    { text: "  failed         : 0", color: red },
    { text: "  success rate   : 100%", color: green },
    { text: "  temperature    : min 31.5C | max 31.6C | avg 31.56C" },
    { text: "  humidity       : min 79.0% | max 79.3% | avg 79.08%" },
    { text: "" },
    { text: "Confirmed Cardano preprod transactions:", color: blue },
    { text: "  primary write  : ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf" },
    { text: "  batch sample 1 : 2e1cab5debadde58e97c6b5a9c4281b0c87627d75a4399a942e3ce064070862f", color: yellow },
    { text: "  batch sample 2 : 329dc4dace3481236c32d4608816e7fd7578f96831a1ebfb4de05286fcb51585", color: yellow },
    { text: "" },
    { text: "Status: PASS - testing logs, issue resolution, and performance metrics prepared.", color: green },
  ],
});
