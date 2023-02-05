const bttButton = document.querySelector('.btt-bubble')
const bttLink = document.querySelector('.btt-arrow')

window.addEventListener('scroll', () => {

  let scroll = window.pageYOffset
  let screenHeight = window.innerHeight

  // back to top button
  if (scroll < screenHeight) {
    bttLink.setAttribute('aria-label', 'Skip to content')
    bttButton.style.transform = 'rotate(180deg)'
    bttLink.setAttribute('href', '#Projects')
    bttLink.setAttribute('title', 'Skip to content')
  } else {
    bttLink.setAttribute('aria-label', 'Return to top')
    bttButton.style.transform = 'rotate(0deg)'
    bttLink.setAttribute('href', '#')
    bttLink.setAttribute('title', 'Back to top')
  }

})