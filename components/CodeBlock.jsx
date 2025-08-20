'use client'

import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { toast } from 'sonner'

export default function CodeBlock({ value }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value.code)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative mb-4">
      <Highlight
        code={value.code}
        language={value.language || 'javascript'}
        theme={themes.jettwaveDark}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 rounded-lg overflow-x-auto`} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} key={i}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 dark:bg-cyan-900 text-white text-xs px-2 py-1 rounded cursor-pointer"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
