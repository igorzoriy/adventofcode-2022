const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");
const input = decoder.decode(data);

type Monkey = {
  id: number;
  items: number[];
  operation: string;
  divisibleBy: number;
  positive: number;
  negative: number;
  inspections: number;
};

const monkeys: Monkey[] = [];
const ROUNDS = 20;

// parse input
for (const part of input.split("\n\n")) {
  const lines = part.split("\n");

  const items = [];
  for (const item of lines[1].replace("  Starting items: ", "").split(", ")) {
    items.push(parseInt(item, 10));
  }

  monkeys.push({
    id: parseInt(lines[0].replace("Monkey ", "").replace(":", ""), 10),
    items,
    operation: lines[2].replace("  Operation: new = ", ""),
    divisibleBy: parseInt(lines[3].replace("  Test: divisible by ", ""), 10),
    positive: parseInt(
      lines[4].replace("    If true: throw to monkey ", ""),
      10,
    ),
    negative: parseInt(
      lines[5].replace("    If false: throw to monkey ", ""),
      10,
    ),
    inspections: 0,
  });
}

// play rounds
for (let r = 0; r < ROUNDS; r++) {
  for (const monkey of monkeys) {
    const { items, operation, divisibleBy, positive, negative } = monkey;
    for (const item of items) {
      let level = eval(operation.replaceAll("old", item.toString()));
      level = Math.floor(level / 3);
      const id = level % divisibleBy === 0 ? positive : negative;
      monkeys[id].items.push(level);
      monkey.inspections++;
    }
    monkey.items = [];
  }
}

const result = monkeys.map((item) => item.inspections).sort((a, b) => b - a)
  .slice(0, 2).reduce((prev, current) => prev * current, 1);
console.log(result);
