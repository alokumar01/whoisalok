import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { sanityClient, urlFor } from '@/lib/sanityClient';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import BlogActions from '@/components/BlogActions';
import { absoluteUrl, buildMetadata, getOgImage, siteConfig } from '@/lib/site';

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  body,
  publishedAt,
  _updatedAt,
  "authorName": author->name,
  "authorImage": author->image,
}`;

const getDescription = (body) => {
  if (!Array.isArray(body)) return siteConfig.description;

  const text = body
    .filter((block) => block?._type === 'block')
    .flatMap((block) => block.children || [])
    .map((child) => child.text || '')
    .join(' ')
    .trim();

  if (!text) return siteConfig.description;

  return text.length > 160 ? `${text.slice(0, 160)}...` : text;
};

async function getPost(slug) {
  return sanityClient.fetch(postQuery, { slug });
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return buildMetadata({
      title: 'Blog',
      description: siteConfig.description,
      path: '/blog',
    });
  }

  const description = getDescription(post.body);
  const image = post.mainImage
    ? {
        url: urlFor(post.mainImage).width(1200).height(630).fit('crop').url(),
        width: 1200,
        height: 630,
        alt: post.title,
      }
    : getOgImage();

  return buildMetadata({
    title: post.title,
    description,
    path: `/blog/${slug}`,
    keywords: [post.title, 'Technical Blog', post.authorName || siteConfig.name],
    type: 'article',
    images: [image],
    publishedTime: post.publishedAt,
    modifiedTime: post._updatedAt || post.publishedAt,
  });
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  const mainImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url()
    : null;
  const authorImageUrl = post.authorImage
    ? urlFor(post.authorImage).width(96).height(96).fit('crop').url()
    : null;

  const resolvedBody = post.body.map((block) => {
    if (block._type === 'image' && block.asset) {
      return { ...block, url: urlFor(block.asset).width(800).url() };
    }
    return block;
  });

  const description = getDescription(resolvedBody);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: [mainImageUrl || absoluteUrl(siteConfig.ogImage)],
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.authorName || siteConfig.name,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <main className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <header className="mb-10 space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              {authorImageUrl && (
                <Image
                  src={authorImageUrl}
                  alt={post.authorName || 'Author'}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <div className="flex items-center gap-2">
                <span className="font-medium">{post.authorName || siteConfig.name}</span>
                <span className="hidden sm:inline">•</span>
                <span>
                  Updated on{' '}
                  {new Date(post._updatedAt || post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {mainImageUrl && (
            <div className="w-full flex justify-center">
              <Image
                src={mainImageUrl}
                alt={post.title || 'Blog cover image'}
                width={1200}
                height={630}
                className="w-full max-w-4xl h-auto rounded-lg object-cover shadow-lg"
                priority
              />
            </div>
          )}
        </header>

        <article className="prose prose-lg max-w-4xl mx-auto dark:prose-invert prose-headings:font-semibold prose-img:rounded-lg prose-img:shadow-md space-y-6">
          <PortableTextRenderer value={resolvedBody} />
        </article>

        <div className="mt-10">
          <BlogActions post={post} />
        </div>

        <div className="mt-6 text-center">
          <Link href="/blog" className="text-sky-700 hover:underline dark:text-sky-300">
            Back to blog posts
          </Link>
        </div>
      </main>
    </>
  );
}
