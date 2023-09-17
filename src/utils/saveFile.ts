/**
 * credit: https://web.dev/browser-fs-access/
 * @param blob
 * @param fileName
 */
const saveFile = async(blob:Blob, fileName = 'qris') => {
  const a = document.createElement('a')
  a.rel = 'noreferrer'
  a.target = '_blank'
  a.download = fileName
  a.href = URL.createObjectURL(blob)
  a.addEventListener('click', (e) => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000)
  })
  a.click()
}

export default saveFile
