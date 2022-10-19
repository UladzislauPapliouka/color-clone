const cols = document.querySelectorAll('.col')

const setRandomColor = () => {
  cols.forEach(col => {
    const text =  col.querySelector("h2")
    const button = col.querySelector("button")
    const  color = chroma.random()
    col.style.background =  color
    text.textContent = color
    setElementColor(text, color)
    setElementColor(button, color)
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

const setElementColor = (element, color) => {
  const luminance = chroma(color).luminance()
  element.style.color = luminance > 0.5 ? '#000' : '#fff'
}
setRandomColor()
document.addEventListener('keydown', event => {
  event.code === "Space"&& setRandomColor()
})