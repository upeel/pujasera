/**
 * untuk mengambil data pertama dari id yang sama
 * @param data
 * @returns
 */
export const filterDuplicateByKey = <T, K extends keyof T>(key: K, data: T[]): T[] => {
  const result = data.filter((item, index, self: typeof data) =>
    index === self.findIndex((t) => t[key] === item[key])
  )

  return result
}

// const filterDuplicateByKey = <T, K extends keyof T>(key: K, data: Array<T>): Array<T> => {
//   if (data.length === 0) {
//     return []
//   }

//   const [first, ...rest] = data
//   const filteredRest = filterDuplicateByKey(key, rest)
//   return filteredRest.some(item => item[key] === first[key]) ? filteredRest : [first, ...filteredRest]
// }
