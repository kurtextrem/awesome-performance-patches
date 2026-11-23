function makeShapes(n) {
  const out = [];
  for (let i = 0; i < 1000; i++) {
    const k = i % n, o = {};
    for (let j = 0; j < k; j++) o["p" + j] = j;  // different prefix => different shape
    o.x = i;
    out.push(o);
  }
  return out;
}
function sumX(arr) { let s = 0; for (let i = 0; i < arr.length; i++) s += arr[i].x; return s; }
for (const n of [Number(process.argv[2])]) {
  const arr = makeShapes(n);
  for (let w = 0; w < 2000; w++) sumX(arr);           // warm up
  const t = process.hrtime.bigint();
  for (let r = 0; r < 20000; r++) sumX(arr);
  const ms = Number(process.hrtime.bigint() - t) / 1e6;
  console.log(`${String(n).padStart(2)} shapes: ${ms.toFixed(0)} ms`);
}
