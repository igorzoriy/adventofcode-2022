type Point = {
  x: number;
  y: number;
};

const comparePoints = (p1: Point, p2: Point): boolean => {
  return p1.x === p2.x && p1.y === p2.y;
};

class Matrix<T> {
  private data: T[][] = [];
  private width = 0;
  private height = 0;

  constructor({ width, height }: { width: number; height: number }) {
    this.width = width;
    this.height = height;

    for (let i = 0; i < height; i++) {
      this.data.push([]);
    }
  }

  getItem({ x, y }: Point): T | undefined {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      throw RangeError(`Out of range index {x:${x}, y:${y}}.`);
    }

    return this.data?.[y]?.[x];
  }

  setItem({ x, y }: Point, item: T): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      throw RangeError(`Out of range index {x:${x}, y:${y}}.`);
    }

    this.data[y][x] = item;
  }

  get size(): { width: number; height: number } {
    return {
      width: this.width,
      height: this.height,
    };
  }
}

type Grid = Matrix<number>;

const parse = (path: string) => {
  const data = Deno.readFileSync(new URL(path, import.meta.url));
  const decoder = new TextDecoder("utf-8");
  const lines = decoder.decode(data).split("\n");

  const height = lines.length, width = lines?.[0].length ?? 0;

  const heightGrid: Grid = new Matrix<number>({ width, height });
  let start: Point | undefined, finish: Point | undefined;

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];

      let height = 0;
      if (char === "S") {
        height = 1;
        start = { x, y };
      } else if (char === "E") {
        height = 26;
        finish = { x, y };
      } else {
        height = char.charCodeAt(0) - 96;
      }
      heightGrid.setItem({ x, y }, height);
    }
  }

  if (!finish || !start) {
    console.error("Invalid input");
    Deno.exit(1);
  }

  return {
    heightGrid,
    start,
    finish,
  };
};

const getNearestPoints = ({ x, y }: Point, grid: Grid): Point[] => {
  const { width, height } = grid.size;
  const current = grid.getItem({ x, y })!;

  return [{ x: x - 1, y }, { x: x + 1, y }, { x, y: y - 1 }, { x, y: y + 1 }]
    .filter(({ x, y }): boolean => {
      if (x < 0 || y < 0 || x >= width || y >= height) {
        return false;
      }

      const pointHeight = grid.getItem({ x, y })!;
      if (pointHeight < current - 1) {
        return false;
      }

      return true;
    });
};

const findShortestPath = ({ heightGrid, finish }: {
  heightGrid: Grid;
  start: Point;
  finish: Point;
}): number => {
  const queue: { point: Point; steps: number }[] = [{
    point: finish,
    steps: 0,
  }];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const { point: current, steps } = queue.shift()!;
    const currentId = `${current.x},${current.y}`;
    const currentHeight = heightGrid.getItem(current);

    if (currentHeight === 1) {
      return steps;
    }

    if (visited.has(currentId)) {
      continue;
    }
    visited.add(currentId);

    const sub = getNearestPoints(current, heightGrid).map((point) => ({
      point,
      steps: steps + 1,
    }));
    queue.push(...sub);
  }

  throw Error("Path not found");
};

const steps = findShortestPath(parse("./input.txt"));
console.log(steps);
