const title = document.querySelector('.title')
const instructions = document.querySelector('.instructions')
const wide = document.querySelector('.wide')
const narrow = document.querySelector('.narrow')
const cards = document.querySelector('.cards')

window.addEventListener('keydown', showTitle)
console.log(instructions)
function showTitle(e) {
  if (e.key === 'Enter') {
    instructions.style.display = 'none'
    title.style.display = 'block'
    window.removeEventListener('keydown', showTitle)
    window.addEventListener('keydown', showNarrow)
  }
}

function showNarrow(e) {
  if (e.key === 'Enter') {
    title.style.display = 'none'
    wide.style.display = 'none'
    narrow.style.display = 'block'
    cards.style.display = 'block'
    window.removeEventListener('keydown', showNarrow)
    cards.addEventListener('click', showPostcard)
  }
}

function showPostcard() {
  console.log('hey')
}
