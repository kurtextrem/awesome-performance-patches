// Usage: node demos/top-self.js <file.cpuprofile>
// Prints the functions where the CPU spent the most time itself (not in the functions they call).
const fs = require("fs");
if (!process.argv[2]) {
  console.error("Usage: node demos/top-self.js <file.cpuprofile>\nMake one with: node --cpu-prof --cpu-prof-dir=/tmp/prof demos/stages.js");
  process.exit(1);
}
const prof = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const byId = new Map(prof.nodes.map((n) => [n.id, n]));
const selfUs = new Map();
for (let i = 0; i < prof.samples.length; i++) {
  const f = byId.get(prof.samples[i]).callFrame;
  const file = f.url ? f.url.split("/").pop() : "";
  const key = `${f.functionName || "(anonymous)"}  ${file}${file ? ":" + (f.lineNumber + 1) : ""}`;
  selfUs.set(key, (selfUs.get(key) || 0) + (prof.timeDeltas[i] || 0));
}
const total = [...selfUs.values()].reduce((a, b) => a + b, 0);
console.log("self ms  share   function  file:line");
for (const [key, us] of [...selfUs].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
  console.log(`${(us / 1000).toFixed(0).padStart(7)}  ${((100 * us) / total).toFixed(0).padStart(4)}%   ${key}`);
}
