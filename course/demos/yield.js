// A "click" arrives 20 ms into 300 ms of work.
// How long does the click wait before its handler runs?
// Run: node demos/yield.js
const { performance } = require('node:perf_hooks');

const WORK_MS = 300;
const CHUNK_MS = 10;
const CLICK_AT_MS = 20;

function busy(ms) {
  const end = performance.now() + ms;
  while (performance.now() < end) { /* pretend to update rows */ }
}

const ways = {
  'one long task': null,
  'chunks + await (no real yield)': () => Promise.resolve(),
  'chunks + setTimeout(0)': () => new Promise((r) => setTimeout(r, 0)),
  'chunks + setImmediate': () => new Promise((r) => setImmediate(r)),
};

async function run(label, yieldFn) {
  const start = performance.now();
  const clicked = new Promise((resolve) => {
    setTimeout(() => resolve(performance.now()), CLICK_AT_MS);
  });
  if (!yieldFn) busy(WORK_MS);
  else for (let done = 0; done < WORK_MS; done += CHUNK_MS) { busy(CHUNK_MS); await yieldFn(); }
  const workDone = performance.now() - start;
  const clickRan = (await clicked) - start;
  return { label, clickWaitMs: Math.max(0, clickRan - CLICK_AT_MS), workDoneMs: workDone };
}

(async () => {
  console.log(`Work: ${WORK_MS} ms in ${CHUNK_MS} ms chunks. Click arrives at ${CLICK_AT_MS} ms.\n`);
  console.log('way'.padEnd(34), 'click waited', '  all work done');
  for (const [label, fn] of Object.entries(ways)) {
    const r = await run(label, fn);
    console.log(label.padEnd(34), `${r.clickWaitMs.toFixed(0).padStart(6)} ms`, `${r.workDoneMs.toFixed(0).padStart(10)} ms`);
  }
  console.log('\nNode stands in for the browser here: a timer plays the click. Numbers vary per machine.');
})();
