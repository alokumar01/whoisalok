import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function SingleBlog({ blog }) {
  const { title, slug, coverImage, publishedAt } = blog;

  const imageUrl = coverImage ? urlFor(coverImage).width(800).height(400).url() : null;

  return (
    <Link href={`/blog/${slug.current}`} className="block border p-4 rounded-md hover:bg-gray-100 transition">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={400}
          className="rounded mb-4 object-cover"
          priority={false}
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-500">
        {new Date(publishedAt).toDateString()}
      </p>
    </Link>
  );
}
