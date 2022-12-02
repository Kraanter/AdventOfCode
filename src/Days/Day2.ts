import { fetchInput, printDay, printLine } from "../Util";

enum MySelection {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z'
}

enum Result {
  Lose = 'X',
  Draw = 'Y',
  Win = 'Z',
}

enum TheirSelection {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C'
}

export async function Main() {
  // Get the input for the day two puzzle
  const input = await fetchInput(2);

  // Split the input into the separate groups of numbers
  const scoreArr = input.split("\n").reduce((scoreArr, group, i) => {
    if (!group)
      return scoreArr;
    // Split the group into the individual numbers and add them together
    const [them, me] = group.split(' ');
    scoreArr[0].push(getScore1(them, me));
    scoreArr[1].push(getScore2(them, me));
    // Add the total for this group to the array of totals
    return scoreArr;
  }, [[], []]);

  const total1 = scoreArr[0].reduce((a, b) => a + b, 0);
  const total2 = scoreArr[1].reduce((a, b) => a + b, 0);
  printDay(2);
  console.log("Total score part one: " + total1);
  console.log("Total Score part two: " + total2);
  printLine();
}

function getScore1(them, me) {
  return getSelectionScore(me) + getMatchResult1(me, them);
}

function getScore2(them, result) {
  return getResultScore(result) + getSelectionScore(getMatchChoiceFromResult(result, them));
}

function getSelectionScore(me: string): number {
  // returning switch case
  switch (me) {
    case 'X': return 1; // Rock
    case 'Y': return 2; // Paper
    case 'Z': return 3; // Scissors
  }
}

function getResultScore(result: Result): number {
  // returning switch case
  switch (result) {
    case Result.Lose: return 0;
    case Result.Draw: return 3;
    case Result.Win: return 6;
  }
}

function getMatchResult1(me: MySelection, them: TheirSelection): number {
  // returning switch case
  switch (me) {
    case MySelection.Rock: return them === TheirSelection.Scissors ? 6 : them === TheirSelection.Paper ? 0 : 3; // Rock
    case MySelection.Paper: return them === TheirSelection.Rock ? 6 : them === TheirSelection.Scissors ? 0 : 3; // Paper
    case MySelection.Scissors: return them === TheirSelection.Paper ? 6 : them === TheirSelection.Rock ? 0 : 3; // Scissors
  }
}

function getMatchChoiceFromResult(result: Result, them: TheirSelection): MySelection {
  // returning switch case
  switch (result) {
    case Result.Win: return them === TheirSelection.Scissors ? MySelection.Rock : them === TheirSelection.Paper ? MySelection.Scissors : MySelection.Paper;
    case Result.Draw: return them === TheirSelection.Scissors ? MySelection.Scissors : them === TheirSelection.Paper ? MySelection.Paper : MySelection.Rock;
    case Result.Lose: return them === TheirSelection.Scissors ? MySelection.Paper : them === TheirSelection.Paper ? MySelection.Rock : MySelection.Scissors;
  }
}

// only run if this file is called directly
if (require.main === module)
  Main();