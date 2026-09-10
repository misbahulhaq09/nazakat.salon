import { useEffect, useRef, useState } from 'react'

/**
 * Intelligent viewport-based video playback hook
 * Pauses video decode and playback when element exits the viewport.
 * Automatically resumes when visible.
 */
export function useInViewVideo(options = { threshold: 0.25, rootMargin: '100px' }) {
  const videoRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
      if (entry.isIntersecting) {
        setIsLoaded(true)
        // Resume playback smoothly if it was paused
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy fallback: keep muted and retry
            video.muted = true
            video.play().catch(() => {})
          })
        }
      } else {
        video.pause()
      }
    }, {
      threshold: options.threshold || 0.2,
      rootMargin: options.rootMargin || '120px',
    })

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin])

  return { videoRef, isInView, isLoaded }
}
