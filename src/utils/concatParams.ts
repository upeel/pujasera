
export const concatParamsToString = <T>(params: T) => {
  // new URLSearchParams(params).toString()
  // const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&')
  return params
}
