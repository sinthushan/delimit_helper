import { IDelimiter } from "../models/delimiter";

export const Filters = ({
  delimiters,
  handleSelect,
  newDelimiterRef,
  addDelimiter,
}: {
  delimiters: IDelimiter[];
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  newDelimiterRef: React.RefObject<HTMLInputElement>;
  addDelimiter: () => void;
}) => {
  const foundDelimiters = delimiters.filter((delimiter) => delimiter.found);
  return (
    <section className="filters">
      <div className="addDelimiterSection">
        <label htmlFor="newDelimiter">Add New Delimiter</label>
        <input
          type="text"
          id="newDelimiter"
          name="newDelimiter"
          ref={newDelimiterRef}
        />
        <button className="newDelimiterBtn" onClick={addDelimiter}>
          Add
        </button>
      </div>
      <div className="found-delimiters">
        <header>Found Delimiters</header>
        <div className="delimiters">
          {foundDelimiters.map((delimiter) => (
            <div className="delimiter">
              <label htmlFor={delimiter.delimiter + "-select"}>
                {delimiter.delimiter}
              </label>
              <select
                name={delimiter.delimiter + "-select"}
                id={delimiter.delimiter + "-select"}
                onChange={handleSelect}
              >
                <option value="row">Indicates new row</option>
                <option value="col">Indicates new column</option>
                <option value="ignore">Ignore</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
