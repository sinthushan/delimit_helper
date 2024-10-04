export default async function copyContent(content: string) {
  try {
    await navigator.clipboard.writeText(content);
    window.alert("Copied to clipboard!");
  } catch (err) {
    window.alert("Something went wrong!");
    console.log(err);
  }
}
