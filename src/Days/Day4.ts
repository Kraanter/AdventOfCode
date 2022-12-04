import { fetchInput, printDay, printLine } from "../Util";

interface Range {
  min: number;
  max: number;
  length: number;
}

type Line = Range[];

export async function Main() {
  // Get the input for the day two puzzle
  const input = await fetchInput(4);

  const score = input.split("\n").reduce((score, pair, i) => {
    if (!pair)
      return score;

    const line: Line = pair.split(",").map(pair => {
      const [min, max] = pair.split("-").map(Number);
      return { min, max, length: max - min + 1 };
    });
    // set the smallest range to the first range
    line.sort((a, b) => a.length - b.length);
    if ((line[0].max <= line[1].max && line[0].max >= line[1].min) || (line[0].min >= line[1].min && line[0].min <= line[1].max))
      score[1]++;
    if (line[0].max <= line[1].max && line[0].min >= line[1].min)
      score[0]++;
    return score;
  }, [0, 1]);

  printDay(3);
  console.log("Total score part one: " + score[0]);
  console.log("Total Score part two: " + score[1]);
  printLine();
}

// only run if this file is called directly
if (require.main === module)
  Main();