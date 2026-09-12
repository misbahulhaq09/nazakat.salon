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

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
      if (entry.isIntersecting) {
        setIsLoaded(true)
        video.muted = true
        video.defaultMuted = true
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy fallback: keep muted and retry on user interaction
            video.muted = true
            const onInteract = () => {
              video.muted = true
              video.play().catch(() => {})
              window.removeEventListener('click', onInteract)
              window.removeEventListener('touchstart', onInteract)
            }
            window.addEventListener('click', onInteract, { once: true })
            window.addEventListener('touchstart', onInteract, { once: true })
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
