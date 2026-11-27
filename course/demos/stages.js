// A fake "report" with three stages. Which one is slow, and is it CPU or waiting?
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function stage(name, fn) {
  const wall0 = performance.now();
  const cpu0 = process.cpuUsage();
  const result = await fn();
  const cpu = process.cpuUsage(cpu0);
  const wall = performance.now() - wall0;
  const cpuMs = (cpu.user + cpu.system) / 1000;
  console.log(`${name.padEnd(10)} wall ${wall.toFixed(0).padStart(5)} ms   cpu ${cpuMs.toFixed(0).padStart(5)} ms`);
  return result;
}

async function fetchRows() {
  await sleep(400); // stands in for a database round trip: we wait, the CPU is idle
  const customers = Array.from({ length: 5000 }, (_, i) => ({ id: "c" + i, name: "C" + i }));
  const orders = Array.from({ length: 20000 }, (_, i) => ({ id: "o" + i, customerId: "c" + ((i * 7) % 5000) }));
  return { customers, orders };
}

function buildRows({ customers, orders }) {
  return orders.map((t) => ({ order: t.id, name: customers.find((v) => v.id === t.customerId).name }));
}

function writeCsv(rows) {
  return rows.map((r) => `${r.order},${r.name}`).join("\n");
}

(async () => {
  const data = await stage("fetch", fetchRows);
  const rows = await stage("build", () => buildRows(data));
  await stage("write", () => writeCsv(rows));
})();
