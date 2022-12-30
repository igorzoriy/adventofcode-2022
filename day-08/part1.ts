const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

const grid: number[][] = [];
const result: boolean[][] = [];

for (const line of decoder.decode(data).split("\n")) {
  const row: number[] = [];
  const resultRow: boolean[] = [];

  let max = -1;
  for (let x = 0; x < line.length; x++) {
    const height = parseInt(line[x], 10);
    row[x] = height;
    if (height > max) {
      resultRow[x] = true;
      max = height;
    } else {
      resultRow[x] = false;
    }
  }

  max = -1;
  for (let x = row.length - 1; x >= 0; x--) {
    const height = row[x];
    if (height > max) {
      resultRow[x] = true;
      max = height;
    }
  }

  grid.push(row);
  result.push(resultRow);
}

for (let x = 0; x < grid[0].length; x++) {
  let max = -1;
  for (let y = 0; y < grid.length; y++) {
    const height = grid[y][x];
    if (height > max) {
      result[y][x] = true;
      max = height;
    }
  }

  max = -1;
  for (let y = grid.length - 1; y >= 0; y--) {
    const height = grid[y][x];
    if (height > max) {
      result[y][x] = true;
      max = height;
    }
  }
}

let visible = 0;
for (const row of result) {
  for (const cell of row) {
    if (cell) visible++;
  }
}

console.log(visible);
