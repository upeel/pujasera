import { InvoiceBodyItem, InvoiceItemsResponse, InvoiceResponse } from 'src/api/index.type'

function craftPayloadItemInvoice(data: InvoiceResponse | null):InvoiceBodyItem[] | [] {
  if (!data) return []
  const item:InvoiceBodyItem[] = data.order_datail.items.flatMap((val) => {
    const tmpObj:Record<string, any> = {
      qty: val.qty
    }
    if (val.type === 'P') {
      tmpObj['id'] = val.product_id
      tmpObj['type'] = 'P'
      tmpObj['variant_id'] = val.product_variant_id
      noteAddons(tmpObj, val)
      return tmpObj
    }
    if (val.type === 'C') {
      tmpObj['id'] = val.product_combo_id
      tmpObj['type'] = 'C'
      tmpObj['variant_id'] = 0
      noteAddons(tmpObj, val)
      return tmpObj
    }
    return tmpObj
  })

  return item
}

const noteAddons = (tmpObj:Record<string, any>, val:InvoiceItemsResponse) => {
  if (val.note) {
    tmpObj['note'] = val.note
  }
  if (val.addons.length > 0) {
    tmpObj['addons'] = []
    val.addons.flatMap(val => {
      tmpObj['addons'].push({
        product_addon_id: val.product_addon_id,
        product_addon_name: val.name
      })
    })
  }
}

export default craftPayloadItemInvoice
