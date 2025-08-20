import Link from 'next/link'
import Head from 'next/head'
import { sanityClient, urlFor } from '@/lib/sanityClient'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import BlogActions from '@/components/BlogActions'

export default async function PostPage({ params }) {
  const { slug } = params

  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image,
  }`

  const post = await sanityClient.fetch(query, { slug })

  if (!post) {
    return (
      <main className="flex flex-col items-center justify-center py-24">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
          Sorry, the post was not found.
        </p>
        <Link href="/blog" className="text-blue-500 underline">
          Go back to blog
        </Link>
      </main>
    )
  }

  // Precompute main and author images for performance
  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null
  const authorImageUrl = post.authorImage
    ? urlFor(post.authorImage).width(64).height(64).url()
    : null

  // Resolve images inside body blocks
  const resolvedBody = post.body.map((block) => {
    if (block._type === 'image' && block.asset) {
      return { ...block, url: urlFor(block.asset).width(800).url() }
    }
    return block
  })

  // Prepare SEO description from first block of content
  const description =
    resolvedBody[0]?._type === 'block'
      ? resolvedBody[0].children?.[0]?.text?.slice(0, 150) || ''
      : ''

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={description} />
        {mainImageUrl && <meta property="og:image" content={mainImageUrl} />}
      </Head>

      <main className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <hr className="dark:border-gray-700 border-gray-300 mb-8" />
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            {authorImageUrl && (
              <img
                src={authorImageUrl}
                alt={post.authorName || 'Author'}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
            )}
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.authorName}</span>
              <span className="hidden sm:inline">•</span>
              <span>
                Updated on{' '}
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        {mainImageUrl && (
          <div className="w-full flex justify-center mb-10">
            <img
              src={mainImageUrl}
              alt={post.title || 'Blog cover image'}
              className="w-full max-w-4xl h-auto object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        )}

        {/* Post Content */}
        <article className="prose prose-lg max-w-4xl mx-auto dark:prose-invert prose-headings:font-semibold prose-img:rounded-lg prose-img:shadow-md space-y-6">
          <PortableTextRenderer value={resolvedBody} />
        </article>

        {/* Blog Actions (including tags & share buttons) */}
        <div className="mt-10">
          <BlogActions post={post} />
        </div>
      </main>
    </>
  )
}
