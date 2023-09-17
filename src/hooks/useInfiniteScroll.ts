import { useCallback, useRef, useState } from 'react'

function useInfiniteScroll(loading?: boolean, callback?: () => void, options?: IntersectionObserverInit): [React.RefCallback<HTMLElement>, boolean] {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  const observer = useRef<IntersectionObserver>()

  const ref = useCallback((node:HTMLDivElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIntersecting(true)
        if (callback) callback()
      }
    }, {
      ...options
    })
    if (node) observer.current.observe(node)
  }, [loading, callback])

  return [
    ref,
    isIntersecting
  ]
}

export default useInfiniteScroll
