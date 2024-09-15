async function fetchImageData() {
  const res = await fetch('/api/images');
  const imageData = await res.json();
  return imageData;
}

export default fetchImageData