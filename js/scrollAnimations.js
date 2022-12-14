const bttButton = document.querySelector('.btt-bubble')
const bttLink = document.querySelector('.btt-arrow')
const svgs = document.querySelectorAll('.left svg')
const projectsSection = document.querySelector('.projects')

let projectsOffset = projectsSection.offsetHeight
let projectsHeight = projectsSection.clientHeight

window.addEventListener('scroll', () => {

  let scroll = window.pageYOffset
  let screenHeight = window.innerHeight

  // back to top button
  if (scroll < screenHeight) {
    bttLink.setAttribute('aria-label', 'Skip to content')
    bttButton.style.transform = 'rotate(180deg)'
    bttLink.setAttribute('href', '#about')
    bttLink.setAttribute('title', 'Skip to content')
  } else {
    bttLink.setAttribute('aria-label', 'Return to top')
    bttButton.style.transform = 'rotate(0deg)'
    bttLink.setAttribute('href', '#')
    bttLink.setAttribute('title', 'Back to top')
  }
  // svgs
  if (window.innerHeight < 900) {
    return;
  } else {
    if(scroll > (projectsOffset + window.innerHeight / 3) 
    && scroll < projectsOffset + projectsHeight * 1.2) {
      svgs[0].style.transform = `translateY(${scroll / 10 -250}px)`
      svgs[1].style.transform = `translateY(-${scroll / 30 -60}px)`
      svgs[2].style.transform = `translateY(${scroll / 30 -50}px)`
      svgs[3].style.transform = `translateY(-${scroll / 20 -100}px)`
      svgs[4].style.transform = `translateY(${scroll / 20 -150}px)`
    }
  }

})