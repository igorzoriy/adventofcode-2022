const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

const instructions = decoder.decode(data).split("\n").values();

const crtWidth = 40;
let crtPointer = 0;
let crt: string = "";

let X = 1, cycle = 0;
let instr: string | null = null;

while (true) {
  cycle++;

  if (crtPointer === X || crtPointer === X - 1 || crtPointer === X + 1) {
    crt += "#";
  } else {
    crt += ".";
  }
  if (crtPointer < crtWidth - 1) {
    crtPointer++;
  } else {
    crt += "\n";
    crtPointer = 0;
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

console.log(crt);
