export const ResultPane = ({ result }: { result: string[][] }) => {
  return (
    <section className="resultpane">
      {result
        ? result.map((row) => (
            <div>
              {row.map((col) => (
                <div>{col}</div>
              ))}
            </div>
          ))
        : ""}
    </section>
  );
};
