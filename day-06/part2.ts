const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

const sequence = decoder.decode(data);
const size = 14;

for (let i = 0; i < sequence.length; i++) {
  const subsequence = sequence.slice(i > size ? i - size : 0, i);
  if (new Set(subsequence).size === size) {
    console.log(i);
    break;
  }
}
