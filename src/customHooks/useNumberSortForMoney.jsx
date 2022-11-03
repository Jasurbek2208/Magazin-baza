// Number money sort
export default function numSort(num) {
  let newNum = "";
  let lastNewNum = "";
  for (
    let i = String(num).length - 1, j = 0;
    j < String(num).length;
    j++, i--
  ) {
    if (j !== 0 && j % 3 === 0) {
      newNum += "." + String(num)[i];
    } else {
      newNum += String(num)[i];
    }
  }
  for (
    let i = String(newNum).length - 1, j = 0;
    j < String(newNum).length;
    j++, i--
  ) {
    lastNewNum += String(newNum)[i];
  }
  return lastNewNum;
}
