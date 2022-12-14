const body = document.querySelector('body')
const leftButton = document.querySelector('.slide-left')
const rightButton = document.querySelector('.slide-right')
const slider = document.querySelector('.slider')
let currentIndex = 0 // keep track of middle element
let sectionSize = 3
let carouselItems = slider.children.length
let translateXValues = Array.from(Array(carouselItems)) // keep track of translate values
// start images offset by 2 images (-200%), to hide edges of carousel where images
// are being moved to/from to create the infinite loop effect
translateXValues.fill(-200, 0, 10)

// set default section size
if (window.innerWidth < 800) {
  body.style.setProperty('--section-size', '2')
  sectionSize = 2
}
if (window.innerWidth < 500) {
  body.style.setProperty('--section-size', '1')
  sectionSize = 1
}
if (window.innerWidth >= 800) {
  body.style.setProperty('--section-size', '3')
  sectionSize = 3
}

// change section size when screen changes size
window.addEventListener('resize', () => {
  if (window.innerWidth < 800) {
    body.style.setProperty('--section-size', '2')
    sectionSize = 2
  }
  if (window.innerWidth < 500) {
    body.style.setProperty('--section-size', '1')
    sectionSize = 1
  }
  if (window.innerWidth >= 800) {
    body.style.setProperty('--section-size', '3')
    sectionSize = 3
  }
})

leftButton.addEventListener('pointerdown', () => {

  currentIndex--
  if (currentIndex === -1) { currentIndex = carouselItems-1 }
  let rightIndex = currentIndex % carouselItems

  Array.from(slider.children).forEach((image, index) => {
    image.style.opacity = '1'
    image.style.transform = `translateX(${translateXValues[index] + 100}%)`
    translateXValues[index] = translateXValues[index] + 100;
  })

  const rightImage = document.querySelectorAll('.slider img')[rightIndex]
  rightImage.style.transform = `translateX(${translateXValues[rightIndex]-100*(carouselItems)}%)`
  rightImage.style.opacity = '0'
  translateXValues[rightIndex] = translateXValues[rightIndex]-100*(carouselItems);

})

rightButton.addEventListener('pointerdown', () => {

  currentIndex++
  let leftIndex = (currentIndex-1) % carouselItems

  Array.from(slider.children).forEach((image, index) => {
    image.style.opacity = '1'
    image.style.transform = `translateX(${translateXValues[index] - 100}%)`
    translateXValues[index] = translateXValues[index] - 100;
  })

  const leftImage = document.querySelectorAll('.slider img')[leftIndex]
  leftImage.style.transform = `translateX(${translateXValues[leftIndex]+100*(carouselItems)}%)`
  leftImage.style.opacity = '0'
  translateXValues[leftIndex] = translateXValues[leftIndex]+100*(carouselItems);

})
