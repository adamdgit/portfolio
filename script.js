const heading = document.querySelector("#heading");
const heading2 = document.querySelector(".sub-heading");
const heading3 = document.querySelector(".sub-heading2");
const headerbg = document.querySelector(".header-bg");

const projectsSection = document.querySelector(".projects");
const projectCards = document.querySelectorAll(".project-card");

// only show animations for large devices
if (window.innerWidth > 700) { 
  // create fancy animations as user scrolls down page
  window.addEventListener("scroll", (e)=> {
    let scrolled = window.scrollY / 20;
  
    if (scrolled < 1) {
      headerbg.style.transform = `translateY(0px) skewY(${10}deg)`;
  
      heading.style.scale = 1;
      heading2.style.transform = `translateX(0px)`;
      heading3.style.transform = `translateX(0px)`;
  
      projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translate(10px, 100px)';
      });
    } 
    else if (scrolled > 30) {
      headerbg.style.opacity = 0;
  
      heading2.style.opacity = 0;
      heading3.style.opacity = 0;
  
      heading.style.opacity = 0;
      heading.style.pointerEvents = "none";
  
      projectsSection.style.opacity = 1;
    } 
    else {
      headerbg.style.transform = `translateY(-${scrolled * 20}px) skewY(${10}deg)`;
      headerbg.style.opacity = 1;
      
      heading2.style.opacity = 1;
      heading3.style.opacity = 1;
      heading2.style.transform = `translateX(${scrolled * 25 +'px'})`;
      heading3.style.transform = `translateX(${-scrolled * 30 +'px'})`;
  
      heading.style.pointerEvents = "all";
      heading.style.opacity = 1;
      heading.style.scale = scrolled;
      heading.style.transform = `translateX(${scrolled * 1.5 +'px'})`;
  
      projectsSection.style.opacity = 0;
    }
  });
  
  // setup observer thresholds and options
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
  
  // Intersection of project cards, trigger fade in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > .6) {
        entry.target.style.transform = `translate(0px)`;
        entry.target.style.opacity = 1;
      }
      if (entry.intersectionRatio > .8) {
        entry.target.style.boxShadow = '7px 7px 0px 0px var(--colour2), 7px 7px 12px 0px var(--colour3)';
      }
    })
  }, options)
  
  projectCards.forEach((image) => { observer.observe(image) });
} else {
  // reset elements for mobile
  projectsSection.style.opacity = 1;
  projectCards.forEach(card => {
    card.style.opacity = 1;
    card.style.transform = 'translate(0px)';
    card.style.boxShadow = '7px 7px 0px 0px var(--colour2), 7px 7px 12px 0px var(--colour3)';
  });
}