import { fetchInput, printDay, printLine } from "../Util";

export async function Main() {
  // Get the input for the day six puzzle
  const input = await fetchInput(6);

  printDay(6);
  console.log("Total score part one: " + getMarkIndex(input, 4));
  console.log("Total Score part two: " + getMarkIndex(input, 14));
  printLine();
}

function getMarkIndex(input: string, length: number) {
  // Loop through all sets of length in the input
  for (let i = 0; i < input.length - length; i++) {
    // Get the current set
    const element = input.substring(i, i + length);
    // Check if the set has no duplicates
    if (!(/(.).*\1/.test(element)))
      // If not return the the end of the set
      return i + length;
  }
}

// only run if this file is called directly
if (require.main === module)
  Main();