const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

type Point = {
  x: number;
  y: number;
};

enum Directions {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R",
}

const ropeLength = 10;
const rope: Point[] = [];
for (let i = 0; i < ropeLength; i++) {
  rope[i] = { x: 0, y: 0 };
}

const moveHead = (head: Point, direction: Directions): void => {
  switch (direction) {
    case Directions.Up:
      head.y++;
      break;
    case Directions.Down:
      head.y--;
      break;
    case Directions.Left:
      head.x--;
      break;
    case Directions.Right:
      head.x++;
      break;
  }
};

const moveKnot = (prev: Point, current: Point): void => {
  const diffX = prev.x - current.x;
  const diffY = prev.y - current.y;

  if (diffX === 2 && diffY === 0) {
    current.x++;
  } else if (diffX === -2 && diffY === 0) {
    current.x--;
  } else if (diffX === 0 && diffY === 2) {
    current.y++;
  } else if (diffX === 0 && diffY === -2) {
    current.y--;
  }

  if (
    (diffX === 2 && diffY === 1) ||
    (diffX === 1 && diffY === 2) ||
    (diffX === 2 && diffY === 2)
  ) {
    current.x++;
    current.y++;
  } else if (
    (diffX === 2 && diffY === -1) ||
    (diffX === 1 && diffY === -2) ||
    (diffX === 2 && diffY === -2)
  ) {
    current.x++;
    current.y--;
  } else if (
    (diffX === -2 && diffY === -1) ||
    (diffX === -1 && diffY === -2) ||
    (diffX === -2 && diffY === -2)
  ) {
    current.x--;
    current.y--;
  } else if (
    (diffX === -2 && diffY === 1) ||
    (diffX === -1 && diffY === 2) ||
    (diffX === -2 && diffY === 2)
  ) {
    current.x--;
    current.y++;
  }
};

const visited = new Set<string>(["0,0"]);

for (const step of decoder.decode(data).split("\n")) {
  const direction = step[0] as Directions;
  const distance = parseInt(step.slice(1), 10);

  for (let i = 0; i < distance; i++) {
    for (let l = 0; l < rope.length; l++) {
      if (l === 0) {
        moveHead(rope[0], direction);
      } else {
        moveKnot(rope[l - 1], rope[l]);
      }
    }

    const tail = rope[rope.length - 1];
    visited.add(`${tail.x},${tail.y}`);
  }
}

console.log(visited.size);
