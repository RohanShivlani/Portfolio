document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    
    // Scroll with an offset to account for the sticky navbar
    window.scrollTo({
      top: targetElement.offsetTop - document.querySelector('.navbar').offsetHeight,
      behavior: 'smooth'
    });
  });
});


// Preloader Logic
const button = document.querySelector("#hide-preloader-button");
const preloader = document.querySelector(".preloader");

// Function to trigger preloader animation and hide it
function runPreloaderAnimation() {
  preloader.classList.add("star-wars-transition");
  setTimeout(() => preloader.classList.add("hide"), 100000);
}

// Trigger preloader animation when the button is clicked
button.addEventListener("click", runPreloaderAnimation);

// Automatically trigger preloader animation after 5 seconds if not clicked
setTimeout(runPreloaderAnimation, 5000);

// Run animation once the window is loaded
window.addEventListener("load", () => {
  window.scrollBy(0, 100);
  
  preloader.addEventListener("animationend", () => {
    preloader.classList.add("hide");
  });
});

// Canvas Setup for Ball Animation
const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
const frameCount = 90;
const images = [];
let ball = { frame: 0 };

// Function to get the current frame path for the ball animation
const currentFrame = (index) => `./theligght/${(index + 1).toString()}.jpg`;

// Load all frames into images array
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  images.push(img);
}

// Trigger GSAP animation for ball frames based on scroll
gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "500%",
  },
  onUpdate: render,
});

// GSAP animation for text opacity based on scroll
gsap.fromTo(
  ".ball-text",
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,
      start: "25%",
      end: "45%",
    },
    onComplete: () => gsap.to(".ball-text", { opacity: 0 }),
  }
);

// Render function to display ball frames
function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}

// Manually trigger the first render once images are loaded
images[0].onload = render;

// Handle scroll event (if any specific behavior needed)
window.addEventListener('scroll', handleScroll);

