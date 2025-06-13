export const slice =
  File.prototype.slice || (File.prototype as any).mozSlice || (File.prototype as any).webkitSlice

export const renderSize = (value: number | string | null | undefined) => {
  if (!value || isNaN(Number(value)) || Number(value) <= 0 || value === '') return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const base = 1024
  const numericValue = Number(value)
  const index = Math.floor(Math.log(numericValue) / Math.log(base))
  const size = (numericValue / Math.pow(base, index)).toFixed(2)

  return `${size} ${units[Math.min(index, units.length - 1)]}`
}
