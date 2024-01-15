export const initVisitorHomePage = function () {
  const slides = document.querySelectorAll(".carousel-item");
  const previousSlideBtn = document.querySelector(".carousel__prev");
  const nextSlideBtn = document.querySelector(".carousel__next");
  const allSlides = document.querySelectorAll(".slide");
  // Carousel starting slide index
  let currentSlide = 0;
  // Carousel items links
  allSlides.forEach((el) =>
    el.addEventListener("click", function () {
      location.hash = "visitorListing";
    })
  );
  //  Carousel function
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = 100;
      } else {
        slide.style.opacity = 0;
      }
    });
  }
  // Next carousel function - increase curent slide index and call carousel function
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  // Previous carousel function - decrease slide index and call carousel function
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  // Add events on previos and next buttons
  previousSlideBtn.addEventListener("click", prevSlide);
  nextSlideBtn.addEventListener("click", nextSlide);
  // Call  carousel function with starting slide index
  showSlide(currentSlide);
};
