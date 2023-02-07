const galleryImages = document.querySelectorAll('.gallery-img')
const projectCards = document.querySelectorAll('.project-card')

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

// Items have opacity of 0, but they are still visible to the Intersection
// Observer and can have styles applied when scrolled into view

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > .2) {
      entry.target.style.transform = 'translateX(0%)'
      entry.target.style.opacity = '1'
    }
  })
}, options)

projectCards.forEach((card) => { observer2.observe(card) })

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > .2) {
      entry.target.style.transform = 'scaleY(1)'
      entry.target.style.opacity = '1'
    }
  })
}, options)

galleryImages.forEach((image) => { observer.observe(image) })
