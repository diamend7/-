const INF = 1000000000;

const G = [
  [0, 0, 1, 4, 0, 0, 0, 0],
  [0, 0, 3, 5, 0, 7, 0, 0],
  [1, 3, 0, 0, 0, 5, 0, 4],
  [4, 5, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 4, 0],
  [0, 7, 5, 0, 0, 0, 6, 0],
  [0, 0, 0, 0, 4, 6, 0, 5],
  [0, 0, 4, 0, 0, 0, 5, 0],
];

function prim() {
  const n = G.length;
  const used = Array(n).fill(false);
  const minEdge = Array(n).fill(INF);
  const parent = Array(n).fill(-1);

  minEdge[0] = 0;

  const mstEdges = [];
  let totalWeight = 0;

  for (let i = 0; i < n; i++) {
    let v = -1;
    for (let j = 0; j < n; j++) {
      if (!used[j] && (v === -1 || minEdge[j] < minEdge[v])) {
        v = j;
      }
    }

    used[v] = true;
    totalWeight += minEdge[v];

    if (parent[v] !== -1) {
      mstEdges.push([parent[v] + 1, v + 1, minEdge[v]]);
    }

    for (let to = 0; to < n; to++) {
      if (G[v][to] !== 0 && G[v][to] < minEdge[to] && !used[to]) {
        minEdge[to] = G[v][to];
        parent[to] = v;
      }
    }
  }

  return { mstEdges, totalWeight };
}

const result = prim();
console.log("Edges of MST:", result.mstEdges);
console.log("Total weight:", result.totalWeight);
