
const listFolder = {
  images: '/images/',
  icons: '/icons/',
  iconsFlag: '/icons/flag/'
}

type FoldersType = 'images' | 'icons' | 'iconsFlag'

export const handleGetAssets = (folders:FoldersType, nameFile:string) => {
  return `${listFolder[folders]}/${nameFile}`
}
