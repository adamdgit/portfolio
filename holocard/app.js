const wrapper = document.querySelector('.card-wrap')
const card = document.querySelector('.card-rotate')
const body = document.querySelector('body')
const gradient = document.querySelector('.gradient')

const sensitivity = 6
card.style.cursor = 'grabbing'

wrapper.addEventListener('pointerdown', (e) => {

  e.preventDefault()

  body.addEventListener('pointermove', mousemove)

  function mousemove(e) { 

    function rotateCard(element, y, x) {

      let box = element.getBoundingClientRect();
      let xAxis = -(y - box.y - (box.height / 2)) / sensitivity;
      let yAxis = (x - box.x - (box.width / 2)) / sensitivity;

      let deg = (xAxis + yAxis) / 4

      element.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg)`

      gradient.style.setProperty('--space', `${Math.max(Math.abs(deg), 1)}%`)
      gradient.style.setProperty('--x', `${xAxis}px`)
      gradient.style.setProperty('--y', `${yAxis}px`)
      body.style.cursor = 'grabbing'

    }
  
    window.requestAnimationFrame( () => {
      rotateCard(card, e.clientY, e.clientX);
    });

  }

  window.addEventListener('pointerup', () => {
    body.removeEventListener('pointermove', mousemove)
    // reset to normal on mouseup
    card.style.transform  = `rotate3d(0,0,0,0deg)`
    body.style.cursor = 'default'
  })

})
