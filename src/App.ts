// get the first argument passed to the script
const args = process.argv;

// remove the ability to throw errors or warnigns
console.warn = console.error = () => { };

const daysDone = [1, 2];

args.splice(0, 2);

let list;

if (args.length > 0) {
  if (args[0] === "latest") {
    list = daysDone.at(-1);
  } else {
    list = args;
  }
} else
  list = daysDone;

list.forEach((val) => {
  if (!val || !(daysDone.includes(Number.parseInt(val)))) {
    console.log(`Day ${val} is not done yet!`);
    return;
  }
  const day = require(`./Days/Day${val}`);
  day.Main();
});