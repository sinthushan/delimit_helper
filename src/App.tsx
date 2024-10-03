//TODO: Fix the below code to work with new delimiter array of Delimiter instances

import React, { useState } from "react";
import { ResultPane } from "./components/ResultPane";
import { TextArea } from "./components/TextArea";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { IDelimiter, delimiters } from "./models/delimiter";
function App() {
  const [text, setText] = useState("");
  const [isRecursive, setIsRecursive] = useState(false);

  const [rowDelimiters, setRowDelimiters] = useState<string[]>([]);
  const [colDelimiters, setColDelimiters] = useState("");
  let delimiter_list: string[] = [];
  //const delimiters: string[] = [",", " ", ";", "|", "\t"];
  const result = find_delimiters(text);

  function cleanArray(arr: string[]): string[] {
    return arr
      .join("##@#")
      .split("##@#")
      .filter((n) => n);
  }

  function find_delimiters(words: string): string[] {
    if (!words) {
      return ["Waiting for input..."];
    }

    const possible_delimiters: (number | string | string[])[][] = [];

    delimiters.forEach((delimiter: IDelimiter) => {
      const arr = words.split(delimiter.delimiter);
      const count = arr.length - 1;
      if (count > 0) {
        if (!delimiter_list.includes(delimiter.delimiter)) {
          if (isRecursive) {
            delimiter_list.push(delimiter.delimiter);
          } else {
            delimiter_list = [delimiter.delimiter];
          }
        }
        if (delimiter.isRowDelimiter) {
          possible_delimiters.push([count, delimiter.delimiter, arr]);
        }
      }
    });

    if (possible_delimiters.length === 0) {
      return ["No clear delimiter found"];
    }

    const sorted_list = possible_delimiters.sort(function (a, b) {
      const countA = a[0] as number;
      const countB = b[0] as number;
      return countB - countA;
    });
    let delimited_list = sorted_list[0][2] as string[];

    if (isRecursive) {
      const temp_list = find_delimiters(delimited_list.join("##@#"));
      if (temp_list[0] !== "No clear delimiter found") {
        delimited_list = temp_list;
      }
    }

    return cleanArray(delimited_list);
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }
  function handleCheck() {
    setIsRecursive(!isRecursive);
  }
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const include = e.target.value;
    const delimiter = delimiters.filter(
      (delimiter) => delimiter.delimiter === e.target.labels[0].innerText
    )[0];
    if (include === "col") {
      delimiter.isRowDelimiter = false;
      delimiter.isColumnDelimiter = true;
      delimiter.ignore = false;
    } else if (include === "row") {
      delimiter.isRowDelimiter = true;
      delimiter.isColumnDelimiter = false;
      delimiter.ignore = false;
    } else if (include === "ignore") {
      delimiter.isRowDelimiter = false;
      delimiter.isColumnDelimiter = false;
      delimiter.ignore = true;
    }
    setRowDelimiters(
      delimiters.map((delimiter): string => {
        if (delimiter.isRowDelimiter) {
          return delimiter.delimiter;
        }
      })
    );
    const columnDelimeter = delimiters.filter(
      (delimiter) => delimiter.isColumnDelimiter
    )[0].delimiter;

    setColDelimiters(columnDelimeter);
  }
  return (
    <>
      <Header />
      <Filters
        delimiters={delimiter_list}
        handleCheck={handleCheck}
        isChecked={isRecursive}
        handleSelect={handleSelect}
      />
      <main className="container">
        <TextArea handleInput={handleInput} text={text} />
        <ResultPane result={result} />
      </main>
    </>
  );
}

export default App;
