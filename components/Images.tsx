"use client"; 
import Image from "next/image";
import useSWR from "swr";

type ImageType = {
  _id: string;
  filename: string;
  contentType: string;
  imageData: string;
};

async function fetchImages(): Promise<ImageType[]> {
  const res = await fetch("http://localhost:3000/images");
  const data = await res.json();
  return data.map((image: { _id: any; filename: any; contentType: any; imageData: string; }) => ({
    _id: image._id,
    filename: image.filename,
    contentType: image.contentType,
    imageData: Buffer.from(image.imageData, "base64").toString()
  }));
}


function Images() {
  const { data: images, error } = useSWR("images", fetchImages);

  if (error) return <div>Failed to load images</div>;
  if (!images) return <div>Loading images...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image._id}>
          <Image
            src={`data:${image.contentType};base64,${image.imageData}`}
            alt={image.filename}
            width={300}
            height={300}
          />
          <p>{image.filename}</p>
        </div>
      ))}
    </div>
  );
}


export default Images;
