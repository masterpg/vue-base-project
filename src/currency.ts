const digitsRE = /(\d{3})(?=\d)/g

export function currency(value: string, currencyMarks?: string, decimals?: number) {
  const num = parseFloat(value)
  if (!isFinite(num) || (!num && num !== 0)) return ''
  currencyMarks = currencyMarks ? currencyMarks : '$'
  decimals = decimals ? decimals : 2
  const stringified = Math.abs(num).toFixed(decimals)
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  const i = _int.length % 3
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  const _float = decimals ? stringified.slice(-1 - decimals) : ''
  const sign = num < 0 ? '-' : ''
  return sign + currencyMarks + head + _int.slice(i).replace(digitsRE, '$1,') + _float
}
