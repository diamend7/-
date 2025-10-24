
const A0 = [47, 50, 61, 41, 53, 12, 68, 63, 3];


const counters = {
  comps: 0,
  assigns: 0, 
};


function cmp(a, b, op = ">") {
  counters.comps++;
  switch (op) {
    case ">":
      return a > b;
    case ">=":
      return a >= b;
    case "<":
      return a < b;
    case "<=":
      return a <= b;
    case "==":
      return a === b;
    default:
      throw new Error("unknown op");
  }
}
function swap(arr, i, j, log = true) {
  const t = arr[i];
  counters.assigns++;
  arr[i] = arr[j];
  counters.assigns++;
  arr[j] = t;
  counters.assigns++;
  if (log) console.log(`   swap: arr[${i}] <-> arr[${j}]  -> ${arr}`);
}


function sink(arr, i, n, phase = "build") {
  let k = i;
  while (true) {
    let j = 2 * k + 1; 
    if (j >= n) break;

   
    if (j + 1 < n && cmp(arr[j + 1], arr[j], ">")) j = j + 1;

   
    if (cmp(arr[k], arr[j], ">=")) break;

    if (phase === "build") {
      console.log(
        `   [build] sink: parent i=${k}=${arr[k]} < child j=${j}=${arr[j]} — опускаем`
      );
    } else {
      console.log(
        `   [sort ] sink: parent i=${k}=${arr[k]} < child j=${j}=${arr[j]} — опускаем`
      );
    }
    swap(arr, k, j);
    k = j;
  }
}


function buildHeap(arr) {
  const n = arr.length;
  console.log("--- Фаза 1: Побудова максимальної купи ---");
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    console.log(` - sink из i=${i} (значение ${arr[i]})`);
    sink(arr, i, n, "build");
  }
  console.log(`Масив після побудови купи: ${arr}\n`);
}


function heapsort(arr) {
  console.log(`Початковий масив: ${arr}\n`);
  buildHeap(arr);

  console.log("--- Фаза 2: Сортування (EXTRACT_MAX + sink) ---");
  for (let i = arr.length - 1; i > 0; i--) {
    console.log(` - EXTRACT_MAX: корінь ${arr[0]} -> в позицію i=${i}`);
    swap(arr, 0, i);
    console.log(`   зменшуємо купу до n=${i}, відновлюємо властивості`);
    sink(arr, 0, i, "sort");
    console.log(`   поточний масив: ${arr}\n`);
  }
  return arr;
}


(function main() {
  const arr = A0.slice();
  const sorted = heapsort(arr);
  console.log("Відсортований масив:", sorted);
  console.log(
    `Підрахунок операцій: comparisons=${counters.comps}, assignments=${counters.assigns}`
  );
})();
