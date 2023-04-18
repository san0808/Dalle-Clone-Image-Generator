async function fetchsuggestion() {
  const res = await fetch("http://localhost:3000/suggestion");
  const suggestion = await res.text();
  return suggestion.trim();
}

export default fetchsuggestion;

  