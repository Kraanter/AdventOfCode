import { fetchInput, printDay, printLine } from "../Util";

export async function Main() {
  // Get the input for the day one puzzle
  const input = await fetchInput(1);

  // Split the input into the separate groups of numbers
  const totalArr = input.split(/^\s*$/gm).reduce((totalArr, group, i) => {
    let currTotal = 0;
    // Split the group into the individual numbers and add them together
    group.split('\n').forEach(element => {
      if (element)
        currTotal += parseInt(element);
    });
    // Add the total for this group to the array of totals
    totalArr.push(currTotal);
    return totalArr;
  }, []);

  // Sort the array from big to small
  totalArr.sort((a, b) => b - a);

  printDay(1);
  console.log("Highest total: " + totalArr[0]);
  console.log("Top 3 combined: " + (totalArr[0] + totalArr[1] + totalArr[2]));
  printLine();
}
// only run if this file is called directly
if (require.main === module)
  Main();