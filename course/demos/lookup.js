// 20,000 orders, each needs its customer from a list of 5,000 customers
const customers = Array.from({ length: 5000 }, (_, i) => ({ id: "c" + i, name: "C" + i }));
const orders = Array.from({ length: 20000 }, (_, i) => ({ id: "o" + i, customerId: "c" + ((i * 7) % 5000) }));

let t = performance.now();
const slow = orders.map((order) => customers.find((v) => v.id === order.customerId).name);
console.log(`find() inside map:  ${(performance.now() - t).toFixed(0)} ms`);

t = performance.now();
const byId = new Map(customers.map((v) => [v.id, v]));
const fast = orders.map((order) => byId.get(order.customerId).name);
console.log(`Map built once:     ${(performance.now() - t).toFixed(1)} ms`);
console.log("same result:", slow.join() === fast.join());
