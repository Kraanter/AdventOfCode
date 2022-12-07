import { fetchInput, printDay, printLine } from "../Util";

enum Commands {
  CD = "cd",
  LS = "ls"
}

const IsCommand = (command: string) => command[0] === "$";

interface File {
  name: string;
  size: number;
}

interface FileSystem {
  [key: string]: number | FileSystem;
  size?: number;
}

const tree: string[] = [];

const root: FileSystem = {}
const totalSpace = 70000000;
const requiredFreeSpace = 30000000;

export async function Main() {
  // Get the input for the day seven puzzle
  const input = await fetchInput(7);
  const lines = input.split("\n");

  lines.forEach((line) => {
    if (IsCommand(line)) {
      const [, commandName, commandArgs] = line.split(" ");
      switch (commandName) {
        case Commands.CD:
          if (commandArgs === "..")
            tree.pop();
          else
            tree.push(commandArgs);
          break;
        case Commands.LS:
          break;
      }
    } else {
      const [data, name] = line.split(" ");
      if (data !== "dir") {
        const size = Number(data);
        const file: File = { size, name };
        addFileToRoot(file);
      }
    }
  });

  const totalSize = getFileSystemSize(root);

  printDay(6);
  console.log("Total score part one: ", getAwnser1(root));
  console.log("Total Score part two: ", getAwnser2(root, totalSize));
  printLine();
}

function getAwnser1(fileSystem: FileSystem) {
  // Loop through all the keys in the file system
  // if the size is smaller than 100000 then add it to the total
  let total = 0;
  Object.keys(fileSystem).forEach((key) => {
    const value = fileSystem[key];
    if (typeof (value) === "number") {
      if (key === "size" && value <= 100000)
        total += value;
    } else {
      total += getAwnser1(value);
    }
  });
  return total;
}

let smallest = { key: "", size: totalSpace };

function getAwnser2(fileSystem: FileSystem, totalFileSystemSize: number) {
  Object.keys(fileSystem).forEach((key) => {
    const value = fileSystem[key];
    if (typeof (value) === "number") {
      const currentleftOverSpace = (totalSpace - totalFileSystemSize) + value;
      const smallestLeftOverSpace = (totalSpace - totalFileSystemSize) + smallest.size
      if (key === "size") {
        console.log(key, value, currentleftOverSpace, smallestLeftOverSpace, totalFileSystemSize, smallest)
        if (currentleftOverSpace <= smallestLeftOverSpace && currentleftOverSpace >= requiredFreeSpace)
          smallest = { key, size: value };
      }
    } else {
      smallest = getAwnser2(value, totalFileSystemSize);
    }
  });
  return smallest;
}

function getFileSystemSize(fileSystem: FileSystem) {
  let size = 0;
  Object.keys(fileSystem).forEach((key) => {
    const value = fileSystem[key];
    if (typeof value === "number") {
      size += value;
    } else {
      size += getFileSystemSize(value);
    }
  });
  fileSystem.size = size;
  return size;
}

function addFileToRoot(file: File) {
  let current = root;
  tree.forEach((dir) => {
    if (!current[dir])
      current[dir] = {};
    const currentDir = current[dir];
    if (typeof currentDir !== "number")
      current = currentDir;
  });
  current[file.name] = file.size;
}

function printFileSystem(fileSystem: FileSystem, depth = 0) {
  const prefix = " ".repeat(depth);
  Object.keys(fileSystem).forEach((key) => {
    const value = fileSystem[key];
    if (typeof value === "number") {
      if (key === "size")
        console.log(`${prefix}- ${key} = ${value})`);
      else
        console.log(`${prefix}- ${key} (file, size=${value})`);
    } else {
      console.log(`${prefix}- ${key} (dir)`);
      printFileSystem(value, depth + 2);
    }
  });
}

// only run if this file is called directly
if (require.main === module)
  Main();