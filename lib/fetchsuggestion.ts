async function fetchsuggestion() {
  const res = await fetch('/api/suggestion');
  const data = await res.json();
  return data.suggestion;
}

export default fetchsuggestion;