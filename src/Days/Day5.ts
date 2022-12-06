import { fetchInput, printDay, printLine } from "../Util";


// The top of the stack is at the start of the array
type Stack = string[];

// Each stack is defined by it's number / id
interface Stacks {
  [key: number]: Stack;
}

interface MoveInstruction {
  from: number;
  to: number;
  amount: number;
}

type MoveInstructions = MoveInstruction[];

export async function Main() {
  // Get the input for the day five puzzle and split it on the newline
  const input = await (await fetchInput(5)).split(/^\s*$/gm);

  // Get the move instructions
  const moveInstructions = getMoveInstructions(input[1]);

  printDay(5);
  console.log("Total score part one: " + getAwnser(executePartOne(getStacks(input[0]), moveInstructions)));
  console.log("Total Score part two: " + getAwnser(executePartTwo(getStacks(input[0]), moveInstructions)));
  printLine();
}

function executePartOne(stacks: Stacks, moveInstructions: MoveInstructions): Stacks {
  return execute(stacks, moveInstructions);
}

function executePartTwo(stacks: Stacks, moveInstructions: MoveInstructions): Stacks {
  return execute(stacks, moveInstructions, true);
}

// Execute the move instructions based on the part
function execute(stacks: Stacks, moveInstructions: MoveInstructions, partTwo: boolean = false): Stacks {
  moveInstructions.forEach(move => {
    // Get the data form the move instruction
    const { from, to, amount } = move;
    // Get the stacks
    const fromStack = stacks[from];
    const toStack = stacks[to];

    if (partTwo) {
      // Get all the elements that need to be moved
      const moved = fromStack.splice(0, amount);
      // Add the elements to the top of the stack
      toStack.unshift(...moved);
    } else {
      // Move the elements from the from stack to the to stack one by one
      for (let i = 0; i < amount; i++) {
        toStack.unshift(fromStack.shift());
      }
    }
  });
  // Return the stacks
  return stacks;
}

// Get the stacks from the input
// Made this beceause the stacks need to be generated for part one and two
function getStacks(input: string): Stacks {
  // Split the input into all the lines
  return input.split("\n").reduce<Stacks>((stacks, stackLine, i) => {
    // Loop through each 2nd line and add it to the stacks
    // Keep looping until we reach the end of the input (i.e. undefined)
    for (let currStack = 1; stackLine[currStack * 4 - 3]; currStack++) {
      // Get the current character
      const character = stackLine[currStack * 4 - 3];
      // Regex to test if the character is a alphabetic character
      if (/[a-zA-Z]/.test(character)) {
        // If the stack doesn't exist, create it
        stacks[currStack] = stacks[currStack] || [];
        // Add the character to the stack
        stacks[currStack].push(character);
      }
    }
    // Return the new stacks
    return stacks;
  }, {});
}

// Get the move instructions from the input
function getMoveInstructions(input: string): MoveInstructions {
  return input.split("\n").filter(n => n !== "").map(getMoveInstruction);
}

// Get the move instruction from the line
function getMoveInstruction(inputLine: string): MoveInstruction {
  // The move instruction is in the format "move X from Y to Z"
  const [, amount, , from, , to] = inputLine.split(" ").map(Number);
  return { from, to, amount };
}

// To get the awnser, we need to get the top of each stack and join them together
// Nice little one liner to do that
const getAwnser = (stacks: Stacks): string => Object.values(stacks).map(stack => getTop(stack)).join("");

// Get the top of the stack if it exists
function getTop(stack: Stack): string {
  return stack?.at(0) || "";
}

// only run if this file is called directly
if (require.main === module)
  Main();