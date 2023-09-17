/**
 *
 * @param timestamp number
 * @param num number milisecond
 * @returns
 */

function timestampReduction(timestamp:number, num:number) {
  const val = num | 0
  const calc = timestamp - val
  return calc
}

export default timestampReduction
