export interface IDelimiter {
  delimiter: string;
  isRowDelimiter: boolean;
  isColumnDelimiter: boolean;
  ignore: boolean;
}

class Delimiter implements IDelimiter {
  delimiter: string;
  isRowDelimiter: boolean = true;
  isColumnDelimiter: boolean = false;
  ignore: boolean = false;

  constructor(delimiter: string) {
    this.delimiter = delimiter;
  }
}

const DELIMITERS_LIST = [",", " ", ";", "|", "\t"];

export const delimiters: Delimiter[] = DELIMITERS_LIST.map(
  (delimiter) => new Delimiter(delimiter)
);
