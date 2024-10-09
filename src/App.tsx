import React, { useEffect, useRef, useState } from "react";
import { ResultPane } from "./components/ResultPane";
import { TextArea } from "./components/TextArea";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { Delimiter, IDelimiter, delimiters } from "./models/delimiter";
function App() {
  const [text, setText] = useState("");
  const [delimitedText, setDelimitedText] = useState<string[][]>([[""]]);
  const newDelimiterRef = useRef<HTMLInputElement>(null);
  const possible_delimiters = find_delimiters(text);
  let message = "";

  if (!text) {
    message = "Waiting for user input...";
    cleanDelimiters();
  } else if (possible_delimiters.length === 0) {
    message = "No delimiters found";
    cleanDelimiters();
  } else {
    message = "";
  }

  useEffect(() => {
    setDelimitedText(delimitText(text));
  }, [text]);

  function cleanDelimiters() {
    delimiters.forEach((delimiter: IDelimiter) => (delimiter.type = "row"));
  }

  function find_delimiters(text: string): (number | string | string[])[][] {
    const possible_delimiters: (number | string | string[])[][] = [];
    delimiters.forEach((delimiter: IDelimiter) => {
      let arr = [];
      if (delimiter.delimiter === "space") {
        arr = text.split(" ");
      } else if (delimiter.delimiter === "new line") {
        arr = text.split("\n");
      } else if (delimiter.delimiter === "tab") {
        arr = text.split("\t");
      } else {
        arr = text.split(delimiter.delimiter);
      }

      const count = arr.length - 1;
      if (count > 0) {
        delimiter.found = true;
        possible_delimiters.push([count, delimiter.delimiter, arr]);
      } else {
        delimiter.found = false;
      }
    });
    return possible_delimiters;
  }

  function delimitText(text: string): string[][] {
    const ROWDELIMITER = "♔";
    const COLDELIMITER = "♕";

    delimiters.forEach((delimiter: IDelimiter) => {
      if (delimiter.type === "row") {
        if (delimiter.delimiter === "space") {
          text = text.replaceAll(" ", ROWDELIMITER);
        } else if (delimiter.delimiter === "new line") {
          text = text.replaceAll("\n", ROWDELIMITER);
        } else if (delimiter.delimiter === "tab") {
          text = text.replaceAll("\t", ROWDELIMITER);
        } else {
          text = text.replaceAll(delimiter.delimiter, ROWDELIMITER);
        }
      } else if (delimiter.type === "col") {
        if (delimiter.delimiter === "space") {
          text = text.replaceAll(" ", COLDELIMITER);
        } else if (delimiter.delimiter === "new line") {
          text = text.replaceAll("\n", COLDELIMITER);
        } else if (delimiter.delimiter === "tab") {
          text = text.replaceAll("\t", COLDELIMITER);
        } else {
          text = text.replaceAll(delimiter.delimiter, COLDELIMITER);
        }
      }
    });

    const delimitedText = text
      .split(ROWDELIMITER)
      .map((row) => row.split(COLDELIMITER));
    return delimitedText;
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const include = e.target.value as "row" | "col" | "ignore";
    const targetDelimiter = e.target.labels[0].innerText;
    delimiters.filter(
      (delimiter) => delimiter.delimiter === targetDelimiter
    )[0].type = include;
    setDelimitedText(delimitText(text));
  }

  function clearTextArea() {
    setText("");
  }

  function addDelimiter() {
    const value = newDelimiterRef.current?.value;
    if (value) {
      if (value === "♔" || value === "♕") {
        window.alert("Character not allowed");
        return;
      }

      const delimiter = new Delimiter(value);
      delimiters.push(delimiter);
      setDelimitedText(delimitText(text));
      newDelimiterRef.current.value = "";
    } else {
      window.alert("Please provide a value");
    }
  }

  return (
    <>
      <Header />
      <Filters
        delimiters={delimiters}
        handleSelect={handleSelect}
        newDelimiterRef={newDelimiterRef}
        addDelimiter={addDelimiter}
      />
      <main className="container">
        <TextArea
          handleInput={handleInput}
          text={text}
          clearTextArea={clearTextArea}
        />
        <ResultPane message={message} delimitedText={delimitedText} />
      </main>
    </>
  );
}

export default App;
