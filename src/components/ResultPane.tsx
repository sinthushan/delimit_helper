export const ResultPane = ({ result }: { result: string[] }) => {
  return (
    <section className="resultpane">
      {result ? result.map((str) => <div>{str}</div>) : ""}
    </section>
  );
};
