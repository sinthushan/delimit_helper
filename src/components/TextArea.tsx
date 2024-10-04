export const TextArea = ({
  handleInput,
  text,
  clearTextArea,
}: {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
  clearTextArea: () => void;
}) => {
  return (
    <section className="textarea">
      <button className="clearbutton" onClick={clearTextArea}>
        Clear
      </button>
      <textarea
        placeholder="Paste in the text you wish to delimit"
        value={text}
        onChange={handleInput}
      />
    </section>
  );
};
