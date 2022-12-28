const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

let calories = 0;
const elvens: number[] = [];
for (const line of decoder.decode(data).split("\n")) {
  if (line.length > 0) {
    calories += parseInt(line, 10);
  } else {
    elvens.push(calories);
    calories = 0;
  }
}

elvens.sort((a, b) => b - a);

console.log(elvens[0] + elvens[1] + elvens[2]);
