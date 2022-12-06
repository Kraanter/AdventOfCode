import { fetchInput, printDay, printLine } from "../Util";

export async function Main() {
  // Get the input for the day three puzzle
  const input = await fetchInput(3);

  const prioArray = input.split("\n").reduce((prioArray, sack, line) => {
    if (!sack)
      return prioArray;
    const half = sack.length / 2;
    const firstHalf = sack.slice(0, half);
    const secondHalf = sack.slice(half);
    // Find the common letter of the two halves
    const commonLetter = firstHalf.split("").find(ch => secondHalf.includes(ch));
    // if there is no common letter, return the array
    if (commonLetter)
      prioArray.push(commonLetter);
    return prioArray;
  }, []);

  // Make groups of 3
  const groupArray: Array<string>[] = input.split("\n").reduce((groupArray, sack, line, input) => {
    if (line % 3 === 0 && sack)
      groupArray.push([input[line], input[line + 1], input[line + 2]]);
    return groupArray;
  }, []);

  // Get the common letter of the groups
  const badgeChars = groupArray.map(group => {
    // Get the shortest string to sort
    group.sort((a, b) => a.length - b.length);
    // Find the common letter
    return group[0].split('').find(char => group[1].includes(char) && group[2].includes(char));
    // Filter out the undefined values
  }).filter(char => char);

  // Add the total of the priority array
  const total1 = prioArray.reduce((a, b) => a + getPriority(b), 0);
  // Add the total of the badge chars priority
  const total2 = badgeChars.reduce((a, b) => a + getPriority(b), 0);

  printDay(3);
  console.log("Total score part one: " + total1);
  console.log("Total Score part two: " + total2);
  printLine();
}


function getPriority(ch: string) {
  // get the ascii value of the character
  const ascii = ch.charCodeAt(0) - 64;
  // return the priority
  if (ascii <= 26) return ascii + 26;
  else return ascii - 32;
}

// only run if this file is called directly
if (require.main === module)
  Main();