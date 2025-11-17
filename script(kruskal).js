function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]);

  const parent = Array(n).fill(0).map((_, i) => i);
  const rank = Array(n).fill(0);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function unite(a, b) {
    a = find(a);
    b = find(b);
    if (a !== b) {
      if (rank[a] < rank[b]) [a, b] = [b, a];
      parent[b] = a;
      if (rank[a] === rank[b]) rank[a]++;
      return true;
    }
    return false;
  }

  const mst = [];
  let total = 0;

  for (const [u, v, w] of edges) {
    if (unite(u, v)) {
      mst.push([u + 1, v + 1, w]);
      total += w;
    }
  }

  return { mst, total };
}

const edges = [
  [0, 2, 1],
  [3, 4, 1],
  [1, 2, 3],
  [0, 3, 4],
  [2, 7, 4],
  [4, 6, 4],
  [2, 5, 5],
  [3, 1, 5],
  [6, 7, 5],
  [6, 5, 6],
  [1, 5, 7]
];

const result = kruskal(8, edges);
console.log("Edges of MST:", result.mst);
console.log("Total weight:", result.total);
