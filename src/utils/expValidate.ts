/**
 *
 * @param ttl (Time to live)
 */
export const ExpValidate = (ttl: number):boolean => {
  const now = new Date()
  const convertTimeStamp = now.getTime() + (ttl * 1000)
  if (now.getTime() > convertTimeStamp) {
    return true
  }
  return false
}
