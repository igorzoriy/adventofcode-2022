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
    this.grid.set(`${x},${y}`, Tile.Sand);
  }

  has(point: Point): boolean {
    return this.grid.has(this.getIndex(point));
  }

  outOfBorders({ x, y }: Point) {
    if (
      this.left === undefined ||
      this.right === undefined
    ) {
      throw Error("Borders haven't been set yet.");
    }
    return x < this.left || x > this.right || y < this.top || y > this.bottom;
  }

  print(): string {
    let print = "Cave\n";
    for (let y = this.top; y <= this.bottom; y++) {
      for (let x = this.left ?? 0; x <= (this.right ?? 0); x++) {
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
    throw Error("Can't drop some sand");
  }
  while (true) {
    if (cave.outOfBorders(sand)) {
      return true;
    }

    if (!cave.has({ x: sand.x, y: sand.y + 1 })) {
      sand.y++;
    } else if (!cave.has({ x: sand.x - 1, y: sand.y + 1 })) {
      sand.x--;
      sand.y++;
    } else if (!cave.has({ x: sand.x + 1, y: sand.y + 1 })) {
      sand.x++;
      sand.y++;
    } else {
      cave.setSand(sand);
      return false;
    }
  }
};

const calcSand = (cave: Cave) => {
  const sandStart: Point = { x: 500, y: 0 };
  let counter = 0;
  while (true) {
    const abyss = dropSand(cave, { ...sandStart });
    if (abyss) break;
    counter++;
  }
  return counter;
};

const cave = parse("./input.test.txt");
console.log(calcSand(cave));
console.log(cave.print());
