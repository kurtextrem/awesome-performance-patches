// 100,000 small order rows, read 20 times. Same answer, two ways to loop over each row's fields.
// Counts time and how many garbage collections ran while each loop was going.
const { PerformanceObserver } = require("node:perf_hooks");

const rows = Array.from({ length: 100000 }, (_, i) => ({
  orderNo: i, customerId: i % 5000, userId: i % 3000, qty: i % 9,
  price: i % 400, tax: i % 70, discount: i % 6, rating: i % 5,
}));

let gcCount = 0;
new PerformanceObserver((list) => { gcCount += list.getEntries().length; }).observe({ entryTypes: ["gc"] });
const tick = () => new Promise((r) => setImmediate(r));

function withEntries(passes) {
  let sum = 0;
  for (let pass = 0; pass < passes; pass++)
    for (const row of rows)
      for (const [, value] of Object.entries(row)) sum += value; // 1 outer array + 8 pair arrays per row
  return sum;
}

function withForIn(passes) {
  let sum = 0;
  for (let pass = 0; pass < passes; pass++)
    for (const row of rows)
      for (const key in row) if (Object.hasOwn(row, key)) sum += row[key]; // nothing new per row
  return sum;
}

async function run(name, fn) {
  await tick();
  gcCount = 0;
  const t = performance.now();
  const result = fn(20);
  const ms = performance.now() - t;
  await tick(); // let the GC observer report
  await tick();
  console.log(`${name.padEnd(16)} ${ms.toFixed(0).padStart(5)} ms   garbage collections: ${gcCount}`);
  return result;
}

(async () => {
  console.log(`Node ${process.version}, 100,000 rows x 8 fields x 20 passes`);
  withEntries(1); // warm up both so the JIT has compiled each before timing
  withForIn(1);
  const a = await run("Object.entries", withEntries);
  const b = await run("for...in", withForIn);
  console.log("same result:", a === b);
})();
