export function numSort(num: number): string {
  let newNum: string = ''
  let lastNewNum: string = ''

  for (let i = String(num)?.length - 1, j = 0; j < String(num).length; j++, i--) {
    j !== 0 && j % 3 === 0 ? (newNum += '.' + String(num)[i]) : (newNum += String(num)[i])
  }

  for (let i = String(newNum).length - 1, j = 0; j < String(newNum).length; j++, i--) {
    lastNewNum += String(newNum)[i]
  }

  return lastNewNum
}