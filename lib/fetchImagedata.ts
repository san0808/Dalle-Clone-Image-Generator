async function fetchImageData() {
  const res = await fetch('/api/images/image');
  const imageData = await res.json();
  return imageData;
}
