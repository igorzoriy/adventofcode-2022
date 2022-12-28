enum Shapes {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

enum RoundResults {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

const data = Deno.readFileSync(new URL("./input.txt", import.meta.url));
const decoder = new TextDecoder("utf-8");

let totalScore = 0;
for (const line of decoder.decode(data).split("\n")) {
  const [opponentShape, roundResult] = line.split(" ");

  let score = 0;
  switch (opponentShape) {
    case Shapes.Rock:
      switch (roundResult) {
        case RoundResults.Lose:
          score += 3;
          break;
        case RoundResults.Draw:
          score += 4;
          break;
        case RoundResults.Win:
          score += 8;
          break;
      }
      break;
    case Shapes.Paper:
      switch (roundResult) {
        case RoundResults.Lose:
          score += 1;
          break;
        case RoundResults.Draw:
          score += 5;
          break;
        case RoundResults.Win:
          score += 9;
          break;
      }
      break;
    case Shapes.Scissors:
      switch (roundResult) {
        case RoundResults.Lose:
          score += 2;
          break;
        case RoundResults.Draw:
          score += 6;
          break;
        case RoundResults.Win:
          score += 7;
          break;
      }
      break;
  }

  totalScore += score;
}

console.log(totalScore);
