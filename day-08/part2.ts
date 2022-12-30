const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

const grid: number[][] = [];
for (const line of decoder.decode(data).split("\n")) {
  const row: number[] = [];

  for (let x = 0; x < line.length; x++) {
    const height = parseInt(line[x], 10);
    row[x] = height;
  }

  grid.push(row);
}

const result: number[][] = [];
let max = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const height = grid[y][x];
    let score = 1;

    let visibility = 0;
    for (let i = x - 1; i >= 0; i--) {
      visibility++;
      if (grid[y][i] >= height) {
        break;
      }
    }
    score *= visibility;

    visibility = 0;
    for (let i = x + 1; i < grid[y].length; i++) {
      visibility++;
      if (grid[y][i] >= height) {
        break;
      }
    }
    score *= visibility;

    visibility = 0;
    for (let i = y - 1; i >= 0; i--) {
      visibility++;
      if (grid[i][x] >= height) {
        break;
      }
    }
    score *= visibility;

    visibility = 0;
    for (let i = y + 1; i < grid.length; i++) {
      visibility++;
      if (grid[i][x] >= height) {
        break;
      }
    }
    score *= visibility;

    if (!result[y]) {
      result[y] = [];
    }
    result[y][x] = score;

    if (score > max) {
      max = score;
    }
  }
}

console.log(max);
