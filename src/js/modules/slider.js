function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

  let slideIndex = 1;
  let offset = 0;

  const slides = document.querySelectorAll(slide), // slide
        slider = document.querySelector(container), // container
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; // из window.getComputedStyle(slidesWrapper) вернется объект и мы получаем оттуда только width

  

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%"; // Получаем кишку и закидываем во внутрь slidesField
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1); // Каждой точке устанавливаем атрибут data-slide-to в i + 1
    dot.classList.add("dot");
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot); // Теперь мы можем использовать массив, а до этого был псевдомассив
  }

  slides.forEach((slide) => {
    // Устанавливаем ширину строгую
    slide.style.width = width;
  });

  function currentSlides() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function slidesTranslate() {
    slidesField.style.transform = `translateX(-${offset}px)`; // Сдвигаем
  }

  function dotsOpacity() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      // '650px'
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    dotsOpacity();
    currentSlides();
    slidesTranslate();
    clearInterval(timerSlide);
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    dotsOpacity();
    currentSlides();
    slidesTranslate();
    clearInterval(timerSlide);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      dotsOpacity();
      currentSlides();
      slidesTranslate();
      clearInterval(timerSlide);
    });
  });

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  function nextSlide() {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      // '650px'
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesTranslate();

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    dotsOpacity();

    currentSlides();
  }

  const timerSlide = setInterval(() => {
    nextSlide();
  }, 2500);
}

export default slider;