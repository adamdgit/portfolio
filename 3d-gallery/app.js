// dom elements
const perspective = document.querySelector('.perspective');
const wrapper = document.querySelector('.wrap');
const images = document.querySelectorAll('.img');
const tooltip = document.querySelector('.drag-tooltip');
const body = document.querySelector('body');

// lower rotates more quickly
const sensitivity = 4;
// save previous rotation
let prevdeg = 0;
// current rotation
let deg = 0;
// how many degrees each image takes up within a circle
const sectionDeg = 360 / images.length;

// set default rotation
images.forEach((image, i) => {
  image.style.transform = `rotate3D(0,1,0,${(i+1) * sectionDeg}deg) translateZ(40vh)`;
})

// only track tooltip on large devices
if (window.innerWidth > 700) {
  // tooltip follows mouse cursor
  body.addEventListener('pointermove', (e) => {
    tooltip.style.transform = `translate(${e.clientX -75}px, ${e.clientY -50}px)`;
  })

  // on hover of perspective layer, show tooltip
  perspective.addEventListener('mouseover', () => {
    console.log('mouse is hovering')
    tooltip.style.opacity = '1';
  })

  perspective.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  })
}

perspective.addEventListener('pointerdown', handlePointerDown);

function handlePointerDown(e) {

  e.preventDefault();
  perspective.style.cursor = 'grabbing';
  
  // get mouse pos on click
  const x = e.clientX;

  // rotate the gallery
  perspective.addEventListener('pointermove', handlePointerMove)

  // transform rotation of wrapper on mouse move
  function handlePointerMove(e) {
    deg = (e.clientX - x) / sensitivity;
    totalDeg = deg + prevdeg + sectionDeg;

    window.requestAnimationFrame(() => {
      images.forEach((image, i) => {
        image.style.transform = `rotate3D(0,1,0,${totalDeg + (i * sectionDeg)}deg) translateZ(40vh)`;
      })
      updateImgVisibility(totalDeg);
    });
  };

  // save current rotation value
  prevdeg += deg;

  perspective.addEventListener('pointerup', handlePointerUp)

  // remove pointermove event listener on pointerup
  function handlePointerUp(e) {
    perspective.removeEventListener('pointermove', handlePointerMove)
    perspective.style.cursor = 'grab';
  };

};

function updateImgVisibility(totalDeg) {
  // check every .5 degrees
  if (totalDeg % .5 === 0) 

  // when rotation is > 275 and < 80 the image should be hidden
  images.forEach((image) => {
    if (Math.abs(image.style.transform.split(" ")[3].slice(0, -4) % 360) > 275 
    || Math.abs(image.style.transform.split(" ")[3].slice(0, -4) % 360) < 80) {
      image.style.opacity = '0';
    } else {
      image.style.opacity = '1';
    }
  })
};