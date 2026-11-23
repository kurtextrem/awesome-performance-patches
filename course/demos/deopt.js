function getX(o) { return o.x; }
for (let i = 0; i < 1e5; i++) getX({ x: i });
%PrepareFunctionForOptimization(getX); getX({ x: 1 }); %OptimizeFunctionOnNextCall(getX); getX({ x: 1 });
getX({ y: 1, x: 2 });
