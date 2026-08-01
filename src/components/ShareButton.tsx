import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

export function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const shareData = {
      title: 'A Journey of Our Friendship',
      text: 'I made this for you. Take a look.',
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // user cancelled or share failed; fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable; nothing more we can do silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-ink-muted transition hover:text-ink"
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      {copied ? 'Link copied' : 'Share this journey'}
    </button>
  )
}
