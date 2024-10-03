import { IDelimiter } from "../models/delimiter";

export const Filters = ({
  delimiters,
  handleSelect,
}: {
  delimiters: IDelimiter[];
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const foundDelimiters = delimiters.filter((delimiter) => delimiter.found);
  return (
    <section className="filters">
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
