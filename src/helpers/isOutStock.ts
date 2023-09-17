/**
 * @param trackInventory number
 * @param isOutStock number
 * @param stockQty number
 * @returns false or true
 *
 * Fungsi untuk cek produk apakah stock masih ada
 *
 * explaination:
 *
 * ada beberapa tahapan untuk mengecek stock yang tersedia, yaitu dengan:
 * - trackInventory: jika true maka qty tidak akan di cek alias product ataupun variant yang didalam nya akan menjadi unlimited.
 * - isOutStock: jika isOutStock true maka akan mengoverride stock menjadi habis walaupun stock masih ada pada product ataupun variant.
 * - stockQty: jika stock dibawah 1 maka stock akan menjadi habis.
 *
 * Gambaran kondisi:
 * - if(trackInventory === 1) {
 * -  if(isOutStock === 1 || stockQty < 1) {
 * -    stok paksa habis atau stock emang sudah habis
 * -  } else {
 * -    stok masih tersedia
 * -  }
 * - } else {
 * -  jadinya unlimited
 * - }
 *
 */
export function productIsOutStock(trackInventory: number, isOutStock: number, stockQty: number):boolean {
  const logic = Number(trackInventory) === 1 ? Number(isOutStock) === 1 || Number(stockQty) < 1 : false
  // console.log(trackInventory, isOutStock, stockQty)
  // console.log('hasil akhir: ', logic)
  return logic
}

/**
 * @param isOutStock number
 * @param stockQty number
 * @returns false or true
 *
 * Fungsi untuk cek produk apakah stock masih ada
 *
 * explaination:
 *
 * ada beberapa tahapan untuk mengecek stock yang tersedia, yaitu dengan:
 * - isOutStock: jika isOutStock true maka akan mengoverride stock menjadi habis walaupun stock masih ada pada product ataupun variant.
 * - stockQty: jika stock dibawah 1 maka stock akan menjadi habis.
 *
 * Gambaran kondisi:
 * - if(isOutStock === 1 || stockQty < 1) {
 * -    stok paksa habis atau stock emang sudah habis
 * -  } else {
 * -    stok masih tersedia
 * -  }
 *
 */
export function comboIsOutStock(isOutStock: number, stockQty: number):boolean {
  const logic = Number(isOutStock) === 1 || Number(stockQty) < 1
  return logic
}
