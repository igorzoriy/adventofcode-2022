const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

const instructions = decoder.decode(data).split("\n").values();

let X = 1, cycle = 0, signal = 0;
let instr: string | null = null;

while (true) {
  cycle++;

  if ((cycle - 20) % 40 === 0) {
    signal += cycle * X;
  }

  if (!instr) {
    const { value, done } = instructions.next();
    if (done) break;

    if (value.startsWith("addx")) {
      instr = value;
    }
  } else {
    const V = parseInt(instr.replace("addx ", ""), 10);
    X += V;
    instr = null;
  }
}

console.log(signal);
