const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

const visited = new Set<string>(["0,0"]);
const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };

for (const step of decoder.decode(data).split("\n")) {
  const direction = step[0];
  const distance = parseInt(step.slice(1), 10);

  for (let i = 0; i < distance; i++) {
    switch (direction) {
      case "U":
        head.y++;
        break;
      case "D":
        head.y--;
        break;
      case "L":
        head.x--;
        break;
      case "R":
        head.x++;
        break;
    }

    const diffX = head.x - tail.x;
    const diffY = head.y - tail.y;

    if (diffX === 2 && diffY === 0) {
      tail.x++;
    } else if (diffX === -2 && diffY === 0) {
      tail.x--;
    } else if (diffX === 0 && diffY === 2) {
      tail.y++;
    } else if (diffX === 0 && diffY === -2) {
      tail.y--;
    }

    if (diffX === 2 && diffY === 1) {
      tail.x++;
      tail.y++;
    } else if (diffX === 1 && diffY === 2) {
      tail.x++;
      tail.y++;
    } else if (diffX === 2 && diffY === -1) {
      tail.x++;
      tail.y--;
    } else if (diffX === 1 && diffY === -2) {
      tail.x++;
      tail.y--;
    } else if (diffX === -2 && diffY === -1) {
      tail.x--;
      tail.y--;
    } else if (diffX === -1 && diffY === -2) {
      tail.x--;
      tail.y--;
    } else if (diffX === -2 && diffY === 1) {
      tail.x--;
      tail.y++;
    } else if (diffX === -1 && diffY === 2) {
      tail.x--;
      tail.y++;
    }

    visited.add(`${tail.x},${tail.y}`);
  }
}

console.log(visited.size);
