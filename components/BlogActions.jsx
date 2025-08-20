'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function BlogActions({ post }) {
  const [currentUrl, setCurrentUrl] = useState('')

  // Set current URL safely in client
  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    toast.success('Link copied to clipboard!')
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 max-w-4xl mx-auto">

      {/* Back Button */}
      <Link href="/blog">
        <Button variant="outline" className="cursor-pointer" size="sm">&larr; Back to Blogs</Button>
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tags?.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium "
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Share Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer"
          onClick={handleCopyLink}
        >
          Copy Link
        </Button>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" variant="outline" className="cursor-pointer">Facebook</Button>
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" variant="outline" className="cursor-pointer">Twitter</Button>
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" variant="outline" className="cursor-pointer">LinkedIn</Button>
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" variant="outline" className="cursor-pointer">WhatsApp</Button>
        </a>
      </div>


    </div>
  )
}
