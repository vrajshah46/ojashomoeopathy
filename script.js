// menu button

let menu = document.querySelector("#menu-btn");
let menuIcon = document.querySelector("#menu-btn i");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menuIcon.classList.toggle("fa-bars");
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menuIcon.classList.add("fa-bars");
  menuIcon.classList.remove("fa-xamrk");
  navbar.classList.remove("active");
};

// img effects

window.addEventListener("load", () => {
  document.querySelectorAll(".zoom-grow").forEach((img) => {
    img.classList.add("active");
  });
});

// service page img loading

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // On page load

// \close aos for mobile view

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 450) {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
});

const counters = document.querySelectorAll(".counter");

const startCounter = () => {
  counters.forEach((counter) => {
    counter.innerText = "0";

    const suffix = counter.getAttribute("data-suffix") || "";
    const target = +counter.getAttribute("data-target");

    // 👇 Special slow animation for 3 and 95
    if (target === 3 || target === 95) {
      let current = 0;

      // Total time for full animation (in ms)
      const totalDuration = target === 3 ? 1500 : 2500; // 1.5s for 3, 2.5s for 95
      const stepTime = totalDuration / target; // time per 1 increment

      const slowStep = () => {
        if (current < target) {
          current++;
          counter.innerText = current; // no suffix until finish
          setTimeout(slowStep, stepTime);
        } else {
          counter.innerText = target + suffix; // final value with suffix
        }
      };

      slowStep();
      return; // don't run default logic for these
    }

    // 🔁 Default animation for all other numbers
    const updateCounter = () => {
      const current = +counter.innerText.replace(/[^0-9]/g, "");
      const increment = target / 200;

      if (current < target) {
        counter.innerText = `${Math.ceil(current + increment)}`;
        setTimeout(updateCounter, 10);
      } else {
        counter.innerText = target + suffix;
      }
    };

    updateCounter();
  });
};

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    startCounter();
    observer.disconnect();
  }
});

observer.observe(document.querySelector(".icons-container"));
