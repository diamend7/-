const INF = 1000000000;

let dist = [
  [0, 0, 1, 4, 0, 0, 0, 0],
  [0, 0, 3, 5, 0, 7, 0, 0],
  [1, 3, 0, 0, 0, 5, 0, 4],
  [4, 5, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 4, 0],
  [0, 7, 5, 0, 0, 0, 6, 0],
  [0, 0, 0, 0, 4, 6, 0, 5],
  [0, 0, 4, 0, 0, 0, 5, 0],
];

// замінюємо 0 (поза діагоналлю) на INF
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if (i !== j && dist[i][j] === 0) {
      dist[i][j] = INF;
    }
  }
}

function floyd() {
  const n = dist.length;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}

const result = floyd();
console.log(result);
