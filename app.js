// Gets all colums 
const cols = document.querySelectorAll('.col')

// Update hash with our colors array to share it
const updateColorHash = (colors = []) => {
  document.location.hash = colors.map((color) => color.toString().substring(1)).join("-")

}

// Get colors arrray from hash
const getColorsFromHash = () => {
  if(document.location.hash.length > 1){
   return document.location.hash.substring(1).split("-").map(color => `#${color}`)
  }
  return []
}

// Set random color to colums
const setRandomColor = (isInitial) => {
  const colors = isInitial ? getColorsFromHash() : []

  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains("fa-lock")
    const text =  col.querySelector("h2")
    const button = col.querySelector("button")

    if(isLocked){
      colors.push(text.textContent)
      return
    }
    // Check should we generate new color or not
    const  color = isInitial 
    ? colors[index] 
      ? colors[index] 
      : chroma.random() 
    : chroma.random()

    if(!isInitial){
      colors.push(color)
    }

    col.style.background =  color
    text.textContent = color
    setElementColor(text, color)
    setElementColor(button, color)
  })
  updateColorHash(colors)
}

// function to generate random color without libraries
const generateRandomColor = () => {
  //RGB
  const hexCodes = "0123456789ABCDEF"
  let color= ""
  for(let i = 0; i<6;i++){
    color+= hexCodes[Math.floor(Math.random()*hexCodes.length)]
  }
  return `#${color}`
}

//Set color to element
const setElementColor = (element, color) => {
  const luminance = chroma(color).luminance()
  element.style.color = luminance > 0.5 ? '#000' : '#fff'
}

// Add listener to generate new colors
document.addEventListener('keydown', event => {
  event.preventDefault()
  event.code === "Space"&& setRandomColor()
})

// Add listener to work with click event
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
// Function to copy to clipboard
const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text)
}

// First start to generate colors or get them from hash
setRandomColor(true)