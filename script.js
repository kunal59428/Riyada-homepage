// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navbar nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});




// hero-slider

 const slidesContainer = document.getElementById("slides");
  const navDots = document.querySelectorAll(".nav-dot");
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function goToSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    navDots.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    navDots[i].classList.add("active");

    slidesContainer.style.transform = `translateX(-${i * 100}%)`;

    animateText(slides[i]);
  }

  function animateText(slide) {
    const h2 = slide.querySelector("h2");
    const buttons = slide.querySelector(".buttons");

    [h2, buttons].forEach((el, i) => {
      el.classList.remove("animate");
      setTimeout(() => {
        el.classList.add("animate");
      }, i * 200); // stagger animation
    });
  }

  navDots.forEach(dot => {
    dot.addEventListener("click", () => {
      index = parseInt(dot.getAttribute("data-index"));
      goToSlide(index);
    });
  });

  // Auto Slide
  // setInterval(() => {
  //   index = (index + 1) % slides.length;
  //   goToSlide(index);
  // }, 7000);

  // Animate first slide on load
  window.addEventListener("load", () => {
    animateText(slides[0]);
  });





// Wrapper


const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildren = [...carousel.children];

    let isDragging = false, startX, startScrollLeft, timeoutId;
    let isAutoPlay = true;

    let cardsPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildren.slice(-cardsPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildren.slice(0, cardsPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
      });
    });

    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      } else if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }

      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    };

    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);


    
// Counter animation function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Initialize counters when element is in viewport
function initCounters() {
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    impactNumbers.forEach(number => {
        observer.observe(number);
    });
}

// Call initCounters when DOM is loaded
document.addEventListener('DOMContentLoaded', initCounters);



// Auto Slider



