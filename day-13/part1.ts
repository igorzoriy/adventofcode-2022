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

let index = 1, counter = 0;
for (const pairs of input.split("\n\n")) {
  const lines = pairs.split("\n");
  const left = JSON.parse(lines[0]) as List,
    right = JSON.parse(lines[1]) as List;
  if (compare(left, right)) {
    counter += index;
  }
  index++;
}
console.log(counter);
