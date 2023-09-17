import { DetailProduct, ProductVariants, ProductAddons } from 'src/api/index.type'

interface VariantTag {
  label: string
  detail: Array<string>
}

/**
 * Untuk membuat tag atau group dari variant
 * @param data data dari detail product
 * @returns contoh hasil: [ { label: 'Variants', detail: ['Mango', 'Mint'] }, { label: 'Size', detail: ['Large', 'Small'] } ]
 */

function createVariantTag(data: DetailProduct<ProductVariants[], ProductAddons[]>) {
  const tags = data.variant_label?.split(',') as string[]
  const transform: VariantTag[] = []

  for (let i = 0; i < tags.length; i++) {
    const detail:Array<string> = []

    for (let j = 0; j < data.variants.length; j++) {
      const names = data.variants[j].name.split(',')
      const index = detail.findIndex(name => name === names[i])

      if (index === -1) {
        detail.push(names[i])
      }
    }

    transform.push({
      label: tags[i],
      detail
    })
  }

  return transform
}

export default createVariantTag
