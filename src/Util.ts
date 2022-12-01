import { Cookie } from "../cookie";

export const fetchInput = async (day: number): Promise<string> => {
  const response = await fetch(`http://adventofcode.com/2022/day/${day}/input`, {
    "headers": {
      Cookie: Cookie
    },
  });
  return await response.text();
}

export const printDay = (day: number) => {
  console.log(`<== Day ${day} =======================================>`);
}

export const printLine = () => {
  console.log(`<================================================>`);
}