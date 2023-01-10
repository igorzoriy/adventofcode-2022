type List = Array<number | List>;

const compare = (left: List, right: List): boolean | null => {
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const leftItem = left[i], rightItem = right[i];

    if (leftItem === undefined) {
      return true;
    }
    if (rightItem === undefined) {
      return false;
    }

    if (Number.isInteger(leftItem) && Number.isInteger(rightItem)) {
      if (leftItem === rightItem) {
        continue;
      }
      return leftItem < rightItem;
    }

    if (Number.isInteger(leftItem) && Array.isArray(rightItem)) {
      return compare([leftItem], rightItem);
    }

    if (Array.isArray(leftItem) && Number.isInteger(rightItem)) {
      return compare(leftItem, [rightItem]);
    }

    if (Array.isArray(leftItem) && Array.isArray(rightItem)) {
      if (leftItem.length === 0 && rightItem.length === 0) {
        continue;
      }

      const r = compare(leftItem, rightItem);
      if (r === null) continue;
      else return r;
    }

    throw Error("Unknown item type");
  }

  return null;
};

// parse and compare
const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");
const input = decoder.decode(data);

const dividerOne: List = [[2]];
const dividerTwo: List = [[6]];
const packets: List[] = [dividerOne, dividerTwo];

for (const line of input.split("\n")) {
  if (!line.length) {
    continue;
  }
  packets.push(JSON.parse(line) as List);
}
packets.sort((left, right) => {
  return compare(left, right) ? -1 : 1;
});

let indexOne = 0, indexTwo = 0;
for (let i = 0; i < packets.length; i++) {
  if (packets[i] === dividerOne) {
    indexOne = i + 1;
  }
  if (packets[i] === dividerTwo) {
    indexTwo = i + 1;
  }
}

console.log(indexOne * indexTwo);
