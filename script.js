const galleryBtn = document.querySelector(".gallery-btn");
const gallery = document.querySelector(".gallery");
const carousel = document.querySelector(".carousel-wrap");
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
if (window.innerWidth < 600) {
  body.style.setProperty('--section-size', '1')
  sectionSize = 2
}
else if (window.innerWidth < 900) {
  body.style.setProperty('--section-size', '2')
  sectionSize = 1
}
else if (window.innerWidth >= 900) {
  body.style.setProperty('--section-size', '3')
  sectionSize = 1
}

galleryBtn.addEventListener("click", (e) => {
  gallery.style.display = "grid";
  gallery.style.pointerEvents = "all";
  // allow time for transition to work after display block is set
  setTimeout(() => {
    gallery.style.opacity = "1";
  }, 50);
});

document.addEventListener("click", (e) => {
  // if user clicks on gallery backdrop, while gallery is open, we close the gallery
  if (e.target.className === "gallery") {
    gallery.style.opacity = "0";
    gallery.style.pointerEvents = "none";
    // allow time for transition to work after display block is set
    setTimeout(() => {
      gallery.style.display = "none";
    }, 250);
  }
});

// change section size when screen changes size
window.addEventListener('resize', () => {
  if (window.innerWidth < 600) {
    body.style.setProperty('--section-size', '1')
    sectionSize = 2
  }
  else if (window.innerWidth < 900) {
    body.style.setProperty('--section-size', '2')
    sectionSize = 1
  }
  else if (window.innerWidth >= 900) {
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
