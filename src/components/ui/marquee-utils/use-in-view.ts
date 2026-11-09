"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function useInView<T extends Element>(
  options?: IntersectionObserverInit,
): [(node: T | null) => void, boolean] {
  const [inView, setInView] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const { root = null, rootMargin, threshold } = options ?? {}

  const ref = useCallback(
    (node: T | null) => {
      observer.current?.disconnect()
      observer.current = null
      if (!node) return
      observer.current = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { root, rootMargin, threshold },
      )
      observer.current.observe(node)
    },
    [root, rootMargin, threshold],
  )

  useEffect(() => () => observer.current?.disconnect(), [])

  return [ref, inView]
}
