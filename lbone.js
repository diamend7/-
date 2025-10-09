// --- ІТЕРАТИВНЕ СОРТУВАННЯ ЗЛИТТЯМ ---
function mergeIterative(arr, left, mid, right) {
  let comparisons = 0,
    assignments = 0;
  let n1 = mid - left;
  let n2 = right - mid;
  let L = arr.slice(left, mid);
  let R = arr.slice(mid, right);
  assignments += n1 + n2;

  let i = 0,
    j = 0,
    k = left;
  while (i < n1 && j < n2) {
    comparisons++;
    if (L[i] < R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
    assignments++;
  }
  while (i < n1) {
    arr[k++] = L[i++];
    assignments++;
  }
  while (j < n2) {
    arr[k++] = R[j++];
    assignments++;
  }
  return { comparisons, assignments };
}

function mergeSortIterative(a) {
  let n = a.length;
  let comparisons = 0,
    assignments = 0;
  for (let i = 1; i < n; i *= 2) {
    for (let j = 0; j < n - i; j += 2 * i) {
      let res = mergeIterative(a, j, j + i, Math.min(j + 2 * i, n));
      comparisons += res.comparisons;
      assignments += res.assignments;
    }
  }
  return { sorted: a, comparisons, assignments };
}

// --- РЕКУРСИВНЕ СОРТУВАННЯ ЗЛИТТЯМ ---
function mergeRecursive(left, right) {
  let merged = [];
  let i = 0,
    j = 0;
  let comparisons = 0,
    assignments = 0;

  while (i < left.arr.length && j < right.arr.length) {
    comparisons++;
    if (left.arr[i] <= right.arr[j]) {
      merged.push(left.arr[i++]);
    } else {
      merged.push(right.arr[j++]);
    }
    assignments++;
  }
  while (i < left.arr.length) {
    merged.push(left.arr[i++]);
    assignments++;
  }
  while (j < right.arr.length) {
    merged.push(right.arr[j++]);
    assignments++;
  }
  return {
    arr: merged,
    comparisons: comparisons + left.comparisons + right.comparisons,
    assignments: assignments + left.assignments + right.assignments,
    recursiveCalls: 1 + left.recursiveCalls + right.recursiveCalls,
  };
}

function mergeSortRecursive(arr) {
  if (arr.length <= 1) {
    return { arr, comparisons: 0, assignments: 0, recursiveCalls: 1 };
  }
  let mid = Math.floor(arr.length / 2);
  let left = mergeSortRecursive(arr.slice(0, mid));
  let right = mergeSortRecursive(arr.slice(mid));
  return mergeRecursive(left, right);
}

// --- ШВИДКЕ СОРТУВАННЯ (схема Хоара) ---
function partition(a, l, r) {
  let comparisons = 0,
    assignments = 0;
  let pivot = a[l];
  assignments++;
  let i = l - 1,
    j = r + 1;
  assignments += 2;

  while (true) {
    do {
      i++;
    } while (a[i] < pivot && ++comparisons);
    comparisons++;

    do {
      j--;
    } while (a[j] > pivot && ++comparisons);
    comparisons++;

    if (i >= j) return { q: j, comparisons, assignments };

    [a[i], a[j]] = [a[j], a[i]];
    assignments += 3;
  }
}

function quicksort(a, l, r) {
  if (l >= r) return { comparisons: 0, assignments: 0, recursiveCalls: 1 };
  let { q, comparisons, assignments } = partition(a, l, r);

  let left = quicksort(a, l, q);
  let right = quicksort(a, q + 1, r);

  return {
    comparisons: comparisons + left.comparisons + right.comparisons,
    assignments: assignments + left.assignments + right.assignments,
    recursiveCalls: 1 + left.recursiveCalls + right.recursiveCalls,
  };
}

let input = [47, 50, 61, 41, 53, 12, 68, 63, 3];

// Ітеративне злиття
let iterRes = mergeSortIterative(input.slice());
console.log(
  "Ітеративне злиття:",
  iterRes.sorted,
  "Порівнянь:",
  iterRes.comparisons,
  "Присвоювань:",
  iterRes.assignments
);

// Рекурсивне злиття
let recRes = mergeSortRecursive(input.slice());
console.log(
  "Рекурсивне злиття:",
  recRes.arr,
  "Порівнянь:",
  recRes.comparisons,
  "Присвоювань:",
  recRes.assignments,
  "Рекурсивних викликів:",
  recRes.recursiveCalls
);

// Швидке сортування
let arrQuick = input.slice();
let quickRes = quicksort(arrQuick, 0, arrQuick.length - 1);
console.log(
  "Швидке сортування:",
  arrQuick,
  "Порівнянь:",
  quickRes.comparisons,
  "Присвоювань:",
  quickRes.assignments,
  "Рекурсивних викликів:",
  quickRes.recursiveCalls
);

