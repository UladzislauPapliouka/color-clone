const cols = document.querySelectorAll('.col')

const setRandomColor = () => {
  cols.forEach(col => {
    const isLocked = col.querySelector('i').classList.contains("fa-lock")
    const text =  col.querySelector("h2")
    const button = col.querySelector("button")
    const  color = chroma.random()
    if(!isLocked){
      col.style.background =  color
      text.textContent = color
      setElementColor(text, color)
      setElementColor(button, color)
    }
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
  event.preventDefault()
  event.code === "Space"&& setRandomColor()
})
document.addEventListener('click', event => {
   const type = event.target.dataset.type
   if(type==="unlock"){
    const node = event.target.tagName.toLowerCase() === "i"
    ? event.target
    : event.target.children[0];
    node.classList.toggle("fa-lock-open")
    node.classList.toggle("fa-lock")
   }else if(type === "copy"){
    copyToClipboard(event.target.textContent)
   }
})

const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text)
}