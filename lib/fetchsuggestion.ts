const fetchsuggestion = async (prompt: string) => {
    const response = await fetch(`/api/suggestion?prompt=${prompt}`, {
      cache: 'no-cache',
    });
    const data = await response.json();
    return data.suggestions;
  };
  
  export default fetchsuggestion;
  