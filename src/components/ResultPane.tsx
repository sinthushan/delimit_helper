export const ResultPane = ({
  message,
  delimitedText,
}: {
  message: string;
  delimitedText: string[][];
}) => {
  return (
    <section className="resultpane">
      <p>{message}</p>
      {delimitedText ? (
        <table>
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
