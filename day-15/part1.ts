type Point = {
  x: number;
  y: number;
};

type Sensor = Point & {
  distance: number;
};

type Segment = {
  start: number;
  finish: number;
};

const parse = (path: string): Sensor[] => {
  const data = Deno.readFileSync(new URL(path, import.meta.url));
  const decoder = new TextDecoder("utf-8");
  const input = decoder.decode(data);

  const sensors: Sensor[] = [];

  for (const line of input.split("\n")) {
    const [sensorX, sensorY, beaconX, beaconY] = line.match(
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/,
    )!.slice(1, 5).map(Number);
    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
    sensors.push({ x: sensorX, y: sensorY, distance });
  }

  return sensors;
};

const getPositionCount = (
  sensors: Sensor[],
  targetRow: number,
): number => {
  let segments: Segment[] = [];
  for (const { x, y, distance } of sensors) {
    const diffY = Math.abs(y - targetRow);
    if (diffY > distance) {
      continue;
    }
    const diffX = distance - diffY;

    const start = x - diffX, finish = x + diffX;
    segments.push({ start, finish });
  }

  segments = segments.sort((a, b) => a.start - b.start);
  segments = segments.reduce((acc: Segment[], cur: Segment) => {
    if (acc.length === 0) {
      acc.push(cur);
      return acc;
    }

    const last = acc.at(-1)!;
    if (last.finish < cur.start) {
      acc.push(cur);
    } else if (last.finish < cur.finish) {
      last.finish = cur.finish;
    }
    return acc;
  }, []);

  return segments.reduce((acc, cur) => acc + (cur.finish - cur.start), 0);
};

const sensors = parse("./input.txt");
const count = getPositionCount(sensors, 2000000);
console.log(count);
