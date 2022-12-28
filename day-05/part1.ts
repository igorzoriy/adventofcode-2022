const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

const [stackStr, guide] = decoder.decode(data).split("\n\n");

const stack: string[][] = [];
for (const line of stackStr.split("\n")) {
  for (let i = 0; i * 4 < line.length; i++) {
    if (stack[i] === undefined) {
      stack.push([]);
    }

    const offset = i * 4;
    const item = line.slice(offset, offset + 3);
    if (item === "   ") {
      continue;
    }
    if (item === ` ${i + 1} `) {
      continue;
    }
    stack[i].push(item.replace("[", "").replace("]", ""));
  }
}

for (const step of guide.split("\n")) {
  const command = step.replace("move ", "").replace("from ", "").replace(
    "to ",
    "",
  ).split(" ");
  const count = parseInt(command[0], 10);
  const from = parseInt(command[1], 10) - 1;
  const to = parseInt(command[2], 10) - 1;

  for (let i = 0; i < count; i++) {
    const item = stack[from].shift();
    if (item) {
      stack[to].unshift(item);
    }
  }
}

let result = "";
for (const row of stack) {
  if (row.length > 0) {
    result += row[0];
  }
}

console.log(result);
