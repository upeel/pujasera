function paramsToObject(entries: any) {
  const result:Record<string, any> = {}
  for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    result[key] = value
  }
  return result
}

export default paramsToObject
