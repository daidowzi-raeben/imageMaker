export function randListAnswer(totalIndex, cnt) {
  const randomIndexArray = []
  for (let i = 0; i < cnt; i++) {
    const randomNum = Math.floor(Math.random() * totalIndex)
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum)
    }
    if (randomIndexArray.length === cnt) break
  }
  return randomIndexArray
}
