export const TextArea = ({
  handleInput,
  text,
}: {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
}) => {
  return (
    <section className="textarea">
      <textarea
        placeholder="Paste in the text you wish to delimit"
        value={text}
        onChange={handleInput}
      />
    </section>
  );
};
