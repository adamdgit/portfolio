const gallery = document.querySelector('.gallery')
const galleryImages = document.querySelectorAll('.gallery-img')
const projectCards = document.querySelectorAll('.project-card')
const aboutSection = document.querySelector('.about')

let thresholds = []
const steps = 100

for (let i=0; i<steps; i++) {
  let ratio = i/steps;
  thresholds.push(ratio)
}

let options = {
  root: null,
  rootMargin: "0px",
  threshold: thresholds
};

const observer = new IntersectionObserver(entry => {
  let timer = 0
  if (entry[0].intersectionRatio > .1) {
    for (let i=0; i<galleryImages.length; i++) {
      // set a timer for adding styles to each image in gallery
      const timer1 = setTimeout(() => {
        galleryImages[i].style.transform = 'scaleY(1)'
        clearTimeout(timer1)
      }, timer)
      timer += 500
    }
    observer.disconnect()
  }
}, options)

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // slide in and make visible project cards
    if (entry.intersectionRatio > .2) {
      entry.target.style.transform = 'translateX(0%)'
      entry.target.style.opacity = '1'
    }
  })
}, options)

const observer3 = new IntersectionObserver(entry => {
  if (entry[0].intersectionRatio > .2) {
    // slide in and make visible about section
    aboutSection.style.transform = 'translateX(0px)'
    aboutSection.style.opacity = '1'
    observer3.disconnect()
  }
}, options)

observer.observe(gallery)
projectCards.forEach((card) => { observer2.observe(card) })
observer3.observe(aboutSection)
