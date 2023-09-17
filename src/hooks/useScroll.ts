import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useScroll as useScrollFramerMotion } from 'framer-motion'

function useScroll() {
  const [scrollY, setScrollY] = useState<number>(0)
  const { scrollY: scrollYFramerMotion } = useScrollFramerMotion()

  useEffect(() => {
    return scrollYFramerMotion.onChange(debounce(handleSetScrollY, 50))
  }, [scrollY])

  const handleSetScrollY = (latest: number) => {
    setScrollY(latest)
  }

  return {
    scrollY
  }
}

export default useScroll
