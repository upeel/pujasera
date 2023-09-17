interface FormatTTL {
  e: number,
  v: string
}

const Storage = ({ storage }:{storage?: 'sessionStorage' | 'localStorage'}) => {
  const defaultStorage = storage || 'localStorage'

  /**
   * Get item from storage
   * @param key
   * @param initialValue
   * @returns value
   */
  const getItem = <T>(key: string, initialValue: T) => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window[defaultStorage].getItem(key)
      if (item) {
        const parseItem = JSON.parse(item)
        const checkTTL = Object.keys(parseItem).indexOf('e')
        if (checkTTL === -1) {
          return parseItem
        } else {
          const itemTTL = parseItem as FormatTTL
          const now = new Date()
          if (now.getTime() > itemTTL.e) {
            removeItem(key)
            return initialValue
          } else {
            return JSON.parse(itemTTL.v)
          }
        }
      } else {
        return initialValue
      }
    } catch (error) {
      // console.log(error)
      return initialValue
    }
  }

  /**
   * Set item to storage
   * @param key
   * @param value
   * @param ttl Time to live on millisecond (additional options)
   */
  const setItem = <T>(key: string, value: T | ((val: T) => T), ttl?: number) => {
    try {
      if (typeof window !== 'undefined') {
        if (ttl) {
          const now = new Date()
          const item = {
            e: now.getTime() + ttl,
            v: JSON.stringify(value)
          }
          window[defaultStorage].setItem(key, JSON.stringify(item))
        } else {
          window[defaultStorage].setItem(key, JSON.stringify(value))
        }
      }
    } catch (error) {
      // console.log(error)
    }
  }

  /**
   * Increase TTL (Time To Live)
   * @param key
   * @param ttl Time to live on millisecond
   */
  const increaseTTL = (key: string, ttl: number) => {
    try {
      if (typeof window === 'undefined') {
        return
      }
      const item = window[defaultStorage].getItem(key)
      if (item) {
        const parseItem = JSON.parse(item) as FormatTTL
        parseItem.e += ttl
        setItem(key, parseItem)
      } else {
        return
      }
    } catch (error) {
      // console.log(error)
    }
  }
  /**
   * Remove item
   * @param key
   * @returns
   */
  const removeItem = (key: string | Array<string>) => {
    try {
      if (typeof window !== 'undefined') {
        if (Array.isArray(key)) {
          return key.forEach(s => {
            window[defaultStorage].removeItem(s)
          })
        }
        window[defaultStorage].removeItem(key)
      }
    } catch (error) {
      // console.log(error)
    }
  }
  /**
   * Clear all item
   */
  const clear = () => {
    try {
      if (typeof window !== 'undefined') {
        window[defaultStorage].clear()
      }
    } catch (error) {
      // console.log(error)
    }
  }

  return {
    setItem,
    getItem,
    increaseTTL,
    removeItem,
    clear
  }
}

export default Storage
