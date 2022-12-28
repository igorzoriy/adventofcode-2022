const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

const sequence = decoder.decode(data);

for (let i = 0; i < sequence.length; i++) {
  const subsequence = sequence.slice(i > 4 ? i - 4 : 0, i);
  if (new Set(subsequence).size === 4) {
    console.log(i);
    break;
  }
}
