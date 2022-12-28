const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

let counter = 0;
for (const line of decoder.decode(data).split("\n")) {
  const [first, second] = line.split(",");
  const firstStart = parseInt(first.split("-")[0], 10);
  const firstEnd = parseInt(first.split("-")[1], 10);
  const secondStart = parseInt(second.split("-")[0], 10);
  const secondEnd = parseInt(second.split("-")[1], 10);

  if (firstStart <= secondStart && firstEnd >= secondEnd) {
    counter++;
  } else if (secondStart <= firstStart && secondEnd >= firstEnd) {
    counter++;
  }
}

console.log(counter);
