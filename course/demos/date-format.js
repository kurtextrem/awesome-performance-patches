// Format 50,000 order dates for a report: a new formatter per date vs one shared formatter.
const N = 50000;
const start = Date.UTC(2026, 0, 1);
const dates = Array.from({ length: N }, (_, i) => new Date(start + i * 600000));
const opts = { timeZone: "UTC", day: "2-digit", month: "short", year: "numeric" };

function time(label, fn) {
  const t = performance.now();
  const out = fn();
  console.log(`${label.padEnd(44)} ${(performance.now() - t).toFixed(0).padStart(6)} ms`);
  return out;
}

const slow = time("toLocaleDateString('en-GB', opts) per date", () =>
  dates.map((d) => d.toLocaleDateString("en-GB", opts)));

const fast = time("one Intl.DateTimeFormat, reused", () => {
  const fmt = new Intl.DateTimeFormat("en-GB", opts);
  return dates.map((d) => fmt.format(d));
});

time("toLocaleString() with no arguments", () => dates.map((d) => d.toLocaleString()));

console.log("same result:", slow.join() === fast.join(), "| sample:", fast[0], "| node", process.version);
