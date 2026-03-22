import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { sanityClient, urlFor } from '@/lib/sanityClient';
import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Technical writing on backend workflows, full-stack development, APIs, and lessons from building modern web applications.',
  path: '/blog',
  keywords: ['Developer Blog', 'Next.js Blog', 'Backend Development', 'Technical Writing'],
});

const getExcerpt = (body) => {
  if (!Array.isArray(body)) return '';

  const text = body
    .filter((block) => block?._type === 'block')
    .flatMap((block) => block.children || [])
    .map((child) => child.text || '')
    .join(' ')
    .trim();

  if (!text) return 'Read the latest article and explore the full write-up.';

  return text.length > 150 ? `${text.slice(0, 150)}...` : text;
};

export default async function BlogPage() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body
  }`;
  const posts = await sanityClient.fetch(query);

  return (
    <main
      className="px-6 py-16 pt-28 text-slate-900 dark:text-slate-100 sm:pt-32"
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        <section className="space-y-4 text-center">
          <p className="section-kicker">Blog</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Writing on development and product thinking
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            A collection of posts on backend workflows, full-stack development, and lessons learned while building practical web projects.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${encodeURIComponent(post.slug.current)}`}
              prefetch={false}
              className="group surface-card surface-card-hover overflow-hidden"
            >
              {post.mainImage && (
                <div className="overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(900).height(520).url()}
                    alt={post.title || 'Blog cover image'}
                    width={900}
                    height={520}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}

              <div className="flex h-full flex-col gap-5 p-6">
                <div className="flex items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span className="tag-chip">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300 sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {getExcerpt(post.body)}
                  </p>
                </div>

                <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-sky-700 dark:text-sky-300">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
