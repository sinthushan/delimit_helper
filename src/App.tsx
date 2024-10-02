import { useState } from "react";
import { ResultPane } from "./components/ResultPane";
import { TextArea } from "./components/TextArea";

function App() {
  const [text, setText] = useState("");

  const result = find_delimiters(text);

  function find_delimiters(words: string): string[] {
    if (!words) {
      return ["Waiting for input..."];
    }
    const delimiters = [",", " ", ";", "|", "\t"];
    const possible_delimiters: (number | string | string[])[][] = [];
    delimiters.forEach((delimiter: string) => {
      const arr = words.split(delimiter);
      const count = arr.length - 1;
      if (count > 0) {
        possible_delimiters.push([count, delimiter, arr]);
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
    return sorted_list[0][2] as string[];
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  return (
    <main className="container">
      <TextArea handleInput={handleInput} text={text} />
      <ResultPane result={result} />
    </main>
  );
}

export default App;
