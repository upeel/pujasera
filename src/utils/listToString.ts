/**
 * Untuk menggabungkan string dari array object, example lists: [{ category: 'Car' }, { category: 'Top Up' }], result: Car, Top Up
 * @param params
 * @param separator example: ',', '|'
 * @returns
 */
const listToString = (params: { list: Array<any>, key: string }[], separator?: string) => {
  separator = separator || ','
  const result:Array<string> = []
  for (let i = 0; i < params.length; i++) {
    if (params[i].list.length > 0) {
      const strJoin = params[i].list.map((x:any) => x[params[i].key]).join(', ')
      result.push(strJoin)
    }
  }
  return result.join(separator)
}

export default listToString
