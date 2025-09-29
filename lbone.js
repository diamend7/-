// сортування вибором

function selectionSort(arr) {
  let comparisons = 0;
  let assignments = 0;
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    assignments++; // присвоєння minIndex

    for (let j = i + 1; j < n; j++) {
      comparisons++; // порівняння
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        assignments++; // присвоєння minIndex
      }
    }

    comparisons++; // перевірка перед обміном
    if (minIndex !== i) {
      // обмін
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
      assignments += 3; // три присвоєння при swap
    }
  }

  return { sorted: arr, comparisons, assignments };
}

const arr1 = [58, 5, 50, 99, 61, 32, 27, 45, 75];
const result1 = selectionSort([...arr1]);
console.log("Selection Sort:");
console.log("Вхідний масив:", arr1);
console.log("Відсортований масив:", result1.sorted);
console.log("Порівнянь:", result1.comparisons);
console.log("Присвоєнь:", result1.assignments);

// сортування вставками

function insertionSort(arr) {
  let comparisons = 0;
  let assignments = 0;
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    assignments++; // присвоєння key

    let j = i - 1;
    assignments++; // присвоєння j

    while (j >= 0 && arr[j] > key) {
      comparisons++; // перевірка в while
      arr[j + 1] = arr[j];
      assignments++;
      j--;
      assignments++;
    }

    if (j >= 0) {
      comparisons++; // коли умова стала false
    }

    arr[j + 1] = key;
    assignments++;
  }

  return { sorted: arr, comparisons, assignments };
}

let arr2 = [58, 5, 50, 99, 61, 32, 27, 45, 75];
let result2 = insertionSort([...arr2]);
console.log("Insertion Sort:");
console.log("Вхідний масив:", arr2);
console.log("Відсортований масив:", result2.sorted);
console.log("Порівнянь:", result2.comparisons);
console.log("Присвоєнь:", result2.assignments);
