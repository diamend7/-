const M = 13;
const A = (Math.sqrt(5) - 1) / 2;

const UA = {
  "А":1,"Б":2,"В":3,"Г":4,"Ґ":5,"Д":6,"Е":7,"Є":8,
  "Ж":9,"З":10,"И":11,"І":12,"Ї":13,"Й":14,
  "К":15,"Л":16,"М":17,"Н":18,"О":19,"П":20,
  "Р":21,"С":22,"Т":23,"У":24,"Ф":25,"Х":26,
  "Ц":27,"Ч":28,"Ш":29,"Щ":30,"Ь":31,"Ю":32,"Я":33
};

const WORDS = [
  "Не", "той", "багатий", "у", "кого", "багато",
  "грошей", "а", "той", "у", "кого", "душа", "багата"
];

function wordValue(word) {
  return word
    .toUpperCase()
    .split("")
    .map(ch => UA[ch] || 0)
    .reduce((a, b) => a + b, 0);
}

function hashDiv(word) {
  return wordValue(word) % M;
}

function hashMul(word) {
  const k = wordValue(word);
  return Math.floor(16 * ((k * A) % 1));
}

function buildOpenHashTable(words, hashFn) {
  const table = Array.from({ length: M }, () => []);
  for (let w of words) {
    const idx = hashFn(w);
    table[idx].push(w);
  }
  return table;
}

function buildClosedHashTable(words, hashFn) {
  const table = Array(M).fill(null);
  for (let w of words) {
    let base = hashFn(w);
    for (let i = 0; i < M; i++) {
      const idx = (base + i) % M;
      if (table[idx] === null) {
        table[idx] = w;
        break;
      }
    }
  }
  return table;
}

function printOpen(title, table) {
  console.log(title);
  for (let i = 0; i < table.length; i++) {
    console.log(i.toString().padStart(2, "0"), ":", table[i]);
  }
}

function printClosed(title, table) {
  console.log(title);
  for (let i = 0; i < table.length; i++) {
    console.log(i.toString().padStart(2, "0"), ":", table[i] ?? "(пусто)");
  }
}

const openDiv = buildOpenHashTable(WORDS, hashDiv);
const openMul = buildOpenHashTable(WORDS, hashMul);
const closedDiv = buildClosedHashTable(WORDS, hashDiv);
const closedMul = buildClosedHashTable(WORDS, hashMul);

printOpen("=== Открытая таблица (деление) ===", openDiv);
printOpen("=== Открытая таблица (умножение) ===", openMul);

printClosed("=== Закрытая таблица (деление) ===", closedDiv);
printClosed("=== Закрытая таблица (умножение) ===", closedMul);
