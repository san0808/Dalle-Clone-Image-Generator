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
  const res = await fetch('/api/images');
  const data = await res.json();

  return data.map((image: { _id: string; imageUrl: string }) => ({
    _id: image._id,
    imageUrl: image.imageUrl,
  }));
}

type ImagesProps = {
  latestImageId?: string;
};


function Images({ latestImageId }: ImagesProps) {
  const { data: images, error } = useSWR("images", fetchImages);
  
  if (error) return <div>Failed to load images</div>;
  if (!images) return <div>Loading images...</div>;
  console.log(images)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div
          key={image._id}
          className={`relative ${
            image._id === latestImageId ? 'ring-4 ring-orange-500' : ''
          }`}
        >
          <Image
            src={`data:${image.contentType};base64,${image.imageData}`}
            alt={image.filename}
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
          {image._id === latestImageId && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-sm rounded">
              New
            </span>
          )}
        </div>
      ))}
    </div>
  );
}


export default Images;