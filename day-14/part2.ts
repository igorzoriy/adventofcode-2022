type Point = {
  x: number;
  y: number;
};

enum Tile {
  Rock = "#",
  Air = ".",
  Sand = "+",
}

class Cave {
  private grid: Map<string, string> = new Map();
  private top = 0;
  private bottom = 0;
  private left?: number;
  private right?: number;

  getIndex({ x, y }: Point): string {
    return `${x},${y}`;
  }

  setRock({ x, y }: Point) {
    if (this.left === undefined || x < this.left) {
      this.left = x;
    }
    if (this.right === undefined || x > this.right) {
      this.right = x;
    }
    if (y > this.bottom) {
      this.bottom = y;
    }
    this.grid.set(`${x},${y}`, Tile.Rock);
  }

  setSand({ x, y }: Point) {
    if (this.left === undefined || x < this.left) {
      this.left = x;
    }
    if (this.right === undefined || x > this.right) {
      this.right = x;
    }
    this.grid.set(`${x},${y}`, Tile.Sand);
  }

  has(point: Point): boolean {
    return this.grid.has(this.getIndex(point));
  }

  isFloor({ y }: Point): boolean {
    return y >= this.bottom + 2;
  }

  print(): string {
    let print = "Cave\n";
    for (let y = this.top; y <= this.bottom + 2; y++) {
      for (let x = this.left ?? 0; x <= (this.right ?? 0); x++) {
        if (y === this.bottom + 2) {
          print += Tile.Rock;
          continue;
        }
        print += this.grid.has(`${x},${y}`)
          ? this.grid.get(`${x},${y}`)
          : Tile.Air;
      }
      print += "\n";
    }

    return print;
  }
}

const parse = (path: string): Cave => {
  const data = Deno.readFileSync(new URL(path, import.meta.url));
  const decoder = new TextDecoder("utf-8");
  const input = decoder.decode(data);

  const cave: Cave = new Cave();
  for (const path of input.split("\n")) {
    let start: Point | null = null;
    for (const line of path.split(" -> ")) {
      const [x, y] = line.split(",").map(Number);
      const end = { x, y };
      if (!start) {
        start = end;
        continue;
      }

      if (start.x === end.x) {
        const startY = Math.min(start.y, end.y);
        const endY = Math.max(start.y, end.y);
        for (let y = startY; y <= endY; y++) {
          cave.setRock({ x: start.x, y });
        }
      } else if (start.y === end.y) {
        const startX = Math.min(start.x, end.x);
        const endX = Math.max(start.x, end.x);
        for (let x = startX; x <= endX; x++) {
          cave.setRock({ x, y: start.y });
        }
      }
      start = end;
    }
  }
  return cave;
};

const dropSand = (cave: Cave, sand: Point): boolean => {
  if (cave.has(sand)) {
    return false;
  }

  while (true) {
    if (
      !cave.has({ x: sand.x, y: sand.y + 1 }) &&
      !cave.isFloor({ x: sand.x, y: sand.y + 1 })
    ) {
      sand.y++;
    } else if (
      !cave.has({ x: sand.x - 1, y: sand.y + 1 }) &&
      !cave.isFloor({ x: sand.x - 1, y: sand.y + 1 })
    ) {
      sand.x--;
      sand.y++;
    } else if (
      !cave.has({ x: sand.x + 1, y: sand.y + 1 }) &&
      !cave.isFloor({ x: sand.x + 1, y: sand.y + 1 })
    ) {
      sand.x++;
      sand.y++;
    } else {
      cave.setSand(sand);
      return true;
    }
  }
};

const calcSand = (cave: Cave) => {
  const sandStart: Point = { x: 500, y: 0 };
  let counter = 0;
  while (true) {
    const result = dropSand(cave, { ...sandStart });
    if (!result) break;
    counter++;
  }
  return counter;
};

const cave = parse("./input.txt");
console.log(calcSand(cave));
console.log(cave.print());
