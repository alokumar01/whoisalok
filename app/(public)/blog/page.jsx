import Link from "next/link"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { sanityClient, urlFor } from "@/lib/sanityClient"

export default async function BlogPage() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    mainImage,
    publishedAt
  }`
  const posts = await sanityClient.fetch(query)

  return (
    <main className="container mx-auto px-6 py-20">
      {/* Divider */}
      <hr className="dark:border-gray-700 border-gray-300  mb-8" />

      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center">
        Latest Blogs
      </h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${encodeURIComponent(post.slug.current)}`}
            prefetch={false}
          >
            <Card className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              
              {/* Image Section */}
              {post.mainImage && (
                <CardHeader className="p-0 m-0">
                  <img
                    src={urlFor(post.mainImage).width(800).height(450).url()}
                    alt={post.title || "Blog cover image"}
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </CardHeader>
              )}

              {/* Content */}
              <CardContent className="flex flex-col flex-grow ">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Last Updated:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
