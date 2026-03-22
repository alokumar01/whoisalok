export const siteConfig = {
  name: 'Alok Kumar',
  siteName: 'Alok Kumar Portfolio',
  title: 'Alok Kumar | Full-Stack Developer',
  description:
    'Full-stack developer portfolio focused on scalable backend systems, clean APIs, modern web applications, and technical writing.',
  url: 'https://whoisalok.tech',
  locale: 'en_US',
  creator: 'Alok Kumar',
  keywords: [
    'Alok Kumar',
    'Full-Stack Developer',
    'Backend Developer',
    'Next.js Portfolio',
    'Node.js Developer',
    'MongoDB',
    'API Development',
    'Developer Portfolio',
    'Web Applications',
    'Technical Blog',
  ],
  authors: [
    {
      name: 'Alok Kumar',
      url: 'https://whoisalok.tech',
    },
  ],
  socialLinks: {
    github: 'https://github.com/alokumar01',
    linkedin: 'https://www.linkedin.com/in/alokumar01',
  },
  ogImage: '/og-image.png',
};

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}

export function getOgImage(path) {
  return {
    url: absoluteUrl(path || siteConfig.ogImage),
    width: 1200,
    height: 630,
    alt: 'Alok Kumar | Full-Stack Developer',
  };
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  type = 'website',
  images,
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
} = {}) {
  const resolvedTitle = title || siteConfig.title;
  const resolvedDescription = description || siteConfig.description;
  const resolvedImages = images?.length ? images : [getOgImage()];
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type,
      images: resolvedImages,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImages.map((image) => image.url),
      creator: siteConfig.creator,
    },
  };
}
