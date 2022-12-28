const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

let calories = 0,
  max = 0;
for (const line of decoder.decode(data).split("\n")) {
  if (line.length === 0) {
    max = calories > max ? calories : max;
    calories = 0;
    continue;
  }
  calories += parseInt(line, 10);
}
console.log(max);
