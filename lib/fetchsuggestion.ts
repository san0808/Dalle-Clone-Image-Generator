const fetchsuggestion = () => {
    fetch('/api/suggestion', {
        cache: 'no-cache',
    },).then((response) => {response.json()});

};

export default fetchsuggestion;