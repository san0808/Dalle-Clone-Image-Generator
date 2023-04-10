async function fetchsuggestion() {
  const res = await fetch("http://localhost:3000/");
  const suggestion = await res.text();
  return suggestion;
}

export default fetchsuggestion;

  