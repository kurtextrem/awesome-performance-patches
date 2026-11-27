// Part 1: nine fake 20 ms database lookups needed before a request can run, done three ways.
// Part 2: the microtask toll: add up 1,000,000 numbers with a plain function vs an async one.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const lookup = () => sleep(20); // stands in for one database round trip

async function serial() {
  await lookup(); // session
  await lookup(); // update "last seen" on the session (needs the session)
  await lookup(); // user
  await lookup(); // user's role (needs the user)
  await lookup(); // role details
  await lookup(); // policies
  await lookup(); // permissions
  await lookup(); // user's teams
  await lookup(); // team tree (needs the teams)
}

async function grouped(permissionsCached) {
  const session = async () => { await lookup(); await lookup(); }; // session, then "last seen"
  const user = async () => { await lookup(); await lookup(); }; // user, then role
  const permissions = async () => { if (!permissionsCached) { await lookup(); await lookup(); await lookup(); } };
  const teams = async () => { await lookup(); await lookup(); }; // teams, then team tree
  await Promise.all([session(), user()]); // wave 1: neither needs the other
  await Promise.all([permissions(), teams()]); // wave 2: both need the user's role
}

async function time(label, fn, runs = 10) {
  let total = 0;
  for (let i = 0; i < runs; i++) {
    const t0 = performance.now();
    await fn();
    total += performance.now() - t0;
  }
  console.log(`${label.padEnd(36)} ${(total / runs).toFixed(0).padStart(4)} ms per request`);
}

function sumSync(xs) { let s = 0; for (const x of xs) s += x; return s; }
async function sumAsync(xs) { let s = 0; for (const x of xs) s += await x; return s; }

(async () => {
  console.log("Part 1: 9 lookups of 20 ms each (average of 10 runs)");
  await time("serial, one after another", serial);
  await time("grouped by dependency", () => grouped(false));
  await time("grouped + permissions cached", () => grouped(true));

  console.log("\nPart 2: add 1,000,000 numbers that are already there");
  const xs = Array.from({ length: 1_000_000 }, (_, i) => i % 10);
  sumSync(xs); await sumAsync(xs); // warm up
  let t0 = performance.now(); sumSync(xs); const syncMs = performance.now() - t0;
  t0 = performance.now(); await sumAsync(xs); const asyncMs = performance.now() - t0;
  console.log(`${"plain function".padEnd(36)} ${syncMs.toFixed(1).padStart(6)} ms`);
  console.log(`${"async function, await per number".padEnd(36)} ${asyncMs.toFixed(1).padStart(6)} ms`);
  console.log(`about ${(asyncMs / syncMs).toFixed(0)}x slower for the same answer`);
})();
