// Group 20,000 orders by status. One status holds most of the orders (the worst case).
const N = 20000;
const orders = Array.from({ length: N }, (_, i) => ({
  id: "o" + i,
  status: i % 10 === 0 ? "s" + (i % 7) : "done",
  customerId: "c" + (i % 5000),
}));

function time(label, fn) {
  const t = performance.now();
  const out = fn();
  console.log(`${label.padEnd(34)} ${(performance.now() - t).toFixed(1).padStart(8)} ms`);
  return out;
}

const a = time("group: [...prev, order] (copy)", () => {
  const groups = new Map();
  for (const order of orders) groups.set(order.status, [...(groups.get(order.status) ?? []), order]);
  return groups;
});

const b = time("group: prev.push(order)", () => {
  const groups = new Map();
  for (const order of orders) {
    const list = groups.get(order.status);
    if (list) list.push(order);
    else groups.set(order.status, [order]);
  }
  return groups;
});
console.log("same groups:", a.get("done").length === b.get("done").length);

// Build an index of 3,000 customers by id.
const customers = Array.from({ length: 3000 }, (_, i) => ({ id: "c" + i, name: "C" + i }));
time("index: {...acc, [id]: v} (copy)", () =>
  customers.reduce((acc, v) => ({ ...acc, [v.id]: v }), {}),
);
time("index: new Map + set", () => new Map(customers.map((v) => [v.id, v])));

// A queue of 100,000 jobs, taken from the front one by one.
const JOBS = 100000;
time("queue: array.shift()", () => {
  const q = Array.from({ length: JOBS }, (_, i) => i);
  let sum = 0;
  while (q.length) sum += q.shift();
  return sum;
});
time("queue: array + head index", () => {
  const q = Array.from({ length: JOBS }, (_, i) => i);
  let sum = 0;
  for (let head = 0; head < q.length; head++) sum += q[head];
  return sum;
});
