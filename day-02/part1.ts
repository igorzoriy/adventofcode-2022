enum OpponentShapes {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

enum MyShapes {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}

const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

let totalScore = 0;
for (const line of decoder.decode(data).split("\n")) {
  const [opponentShape, myShape] = line.split(" ");

  let score = 0;
  switch (myShape) {
    case MyShapes.Rock:
      score = 1;
      switch (opponentShape) {
        case OpponentShapes.Rock:
          score += 3;
          break;
        case OpponentShapes.Paper:
          break;
        case OpponentShapes.Scissors:
          score += 6;
          break;
      }
      break;
    case MyShapes.Paper:
      score = 2;
      switch (opponentShape) {
        case OpponentShapes.Rock:
          score += 6;
          break;
        case OpponentShapes.Paper:
          score += 3;
          break;
        case OpponentShapes.Scissors:
          break;
      }
      break;
    case MyShapes.Scissors:
      score = 3;
      switch (opponentShape) {
        case OpponentShapes.Rock:
          break;
        case OpponentShapes.Paper:
          score += 6;
          break;
        case OpponentShapes.Scissors:
          score += 3;
      }
      break;
  }
  totalScore += score;
}

console.log(totalScore);
