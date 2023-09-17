import { store } from 'src/store'

/**
 *
 * @param angka
 * @returns (example: IDR 10.000)
 */
export function formatCurrency(angka:string | number, withPrefix = true):string {
  angka = angka.toString()
  const s = parseInt(angka)
  const digit = store.getState().app.store.dec_digit
  const cts = store.getState().app.store.thousands_sep
  const cdp = store.getState().app.store.dec_point
  const currency_symbol = store.getState().app.store.currency_id
  const val = (s / 1).toFixed(digit).replace(cts, cdp)
  const thousandsSeparator = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, cts)
  const finalResult = withPrefix
    ? currency_symbol + ' ' + thousandsSeparator
    : thousandsSeparator
  return finalResult
}

export function formatNumber(angka: string | number) {
  const number:number|string = Number(angka)
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  }).format(number)
}
