import { PortableText } from '@portabletext/react'
import CodeBlock from '@/components/CodeBlock'

const components = {
  types: {
    image: ({ value }) => (
      <img
        src={value.url} // precomputed URL
        alt={value.alt || ''}
        className="my-4 rounded-md"
      />
    ),
    code: ({ value }) => <CodeBlock value={value} />, // only receives plain code
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold my-2">{children}</h3>,
    normal: ({ children }) => <p className="my-2 leading-7">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4">{children}</blockquote>
    ),
  },
}

export default function PortableTextRenderer({ value }) {
  return <PortableText value={value} components={components} />
}
