const cols = document.querySelectorAll('.col')

const setRandomColor = () => {
  cols.forEach(col => {
    col.style.background = generateRandomColor()
  })
}
const generateRandomColor = () => {
  //RGB
  const hexCodes = "0123456789ABCDEF"
  let color= ""
  for(let i = 0; i<6;i++){
    color+= hexCodes[Math.floor(Math.random()*hexCodes.length)]
  }
  return `#${color}`
}
setRandomColor()