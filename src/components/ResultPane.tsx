import { useRef } from "react";
import copyContent from "../utils/copytoclipboard";

export const ResultPane = ({
  message,
  delimitedText,
}: {
  message: string;
  delimitedText: string[][];
}) => {
  const ref = useRef<HTMLTableElement>(null);

  const handleClick = () => {
    copyContent(ref.current!.innerText);
  };
  return (
    <section className="resultpane">
      {message ? (
        <p className="resultHeading">{message}</p>
      ) : (
        <button className="resultHeading toClipboardbtn" onClick={handleClick}>
          Copy to Clipboard
        </button>
      )}

      {delimitedText ? (
        <table ref={ref}>
          <tbody>
            {delimitedText.map((row) => (
              <tr className="row">
                {row.map((col) => (
                  <td className="col">{col}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </section>
  );
};
