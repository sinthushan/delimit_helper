/* eslint-disable no-useless-escape */
export interface IDelimiter {
  delimiter: string;
  type: "row" | "col" | "ignore";
  found: boolean;
}

class Delimiter implements IDelimiter {
  delimiter: string;
  type: "row" | "col" | "ignore" = "row";
  found: boolean = false;

  constructor(delimiter: string) {
    this.delimiter = delimiter;
  }
}

const DELIMITERS_LIST = [",", "space", ";", "|", "\t"];

export const delimiters: Delimiter[] = DELIMITERS_LIST.map(
  (delimiter) => new Delimiter(delimiter)
);
