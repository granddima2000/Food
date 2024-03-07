/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function calcTotal() {
    // занимается расчетом на мужчину / женщину
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDinamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        // Если мы нашли не число в нашем value, то значит пользователь вводит что-то неправильно
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDinamicInformation("#height");
  getDinamicInformation("#weight");
  getDinamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards (){
  //CLASS Урок 48

  class MenuCard{
      constructor(scr, alt, subtitle, descr, price, parentSelector, ...classes ) { //помогает создат n-ое кол-вл классов
          this.scr=scr;
          this.alt=alt;
          this.subtitle=subtitle;
          this.descr=descr;
          this.price=price;
          this.classes=classes;
          this.parent=document.querySelector(parentSelector); //DOM-эл ктр можно использовать
          this.transfer=89;
          this.changeToRUB(); //вызываем метод сразу
      }

      //метод конвертации валют
      changeToRUB() {
          this.price=this.price*this.transfer;
      }

      //render - создать эл., поместить вертку и показать на стр.
      render() {
          const element=document.createElement('div');

          if (this.classes.length===0){
              this.element = "menu__item";
              element.classList.add(this.element);
          } else{
              this.classes.forEach(className => element.classList.add(className));//перебираем массив и где нет класса указывает  
          }

          element.innerHTML= `
              <img src=${this.scr} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.subtitle} </h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
              </div>
          `;

          this.parent.prepend(element);
      }

  }

  //вызваем фун-ию (ур. 59)
  // getResource('http://localhost:3000/menu')
  // .then (data => {
  //     data.forEach ( ({img, altimg, title, descr, price}) =>{
  //         new MenuCard (img, altimg, title, descr, price, '.menu .container').render();
  //     });
  // });


  //Подключаем библиотеку axios (урок 60)
  axios.get ('http://localhost:3000/menu')
      .then (data => {
          data.data.forEach (({img, altimg, title, descr, price}) =>{
              new MenuCard (img, altimg, title, descr, price, '.menu .container').render();
          });
      });

  //Создание динамически эл. на стр (без шаблона, только на 1 эл), ур. 59
  // getResource ('http://localhost:3000/menu')
  //     .then(data => createCart(data));

  // function createCart (data){
  //     data.forEach ( ({img, altimg, title, descr, price}) =>{
  //         const element = document.createElement('div');

  //         element.classList.add('menu__item');
  //         element.innerHTML =`
  //             <img src=${img} alt=${altimg}>
  //             <h3 class="menu__item-subtitle">${title} </h3>
  //             <div class="menu__item-descr">${descr}</div>
  //             <div class="menu__item-divider"></div>
  //             <div class="menu__item-price">
  //                 <div class="menu__item-cost">Цена:</div>
  //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //             </div>
  //         `;

  //         document.querySelector('.menu .container').append(element);

  //     });
  // }



  //УЖЕ НЕ АКТУАЛЬНЫ, тк уже есть фун-ия выше
  // new MenuCard (
  //     "img/tabs/vegy.jpg", 
  //     "vegy", 
  //     'Меню "Фитнес"', 
  //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!
  //     10,
  //     '.menu .container'
  // ).render();



        //     const getResource = async (url) => {
      //         const res = await fetch(url);
      //         if (!res.ok) {
      //             throw new Error(`Could not fetch ${url}, status: ${res.status}`); // Выкидываем ошибку
      //         }
      //         return await res.json(); // Возвращаем promis из fetch и обрабатываем методом json
      //    };
    
      //    getResource('http://localhost:3000/menu')
      //         .then(data => {
      //             data.forEach(({img, altimg, title, descr, price}) => {
      //                 new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      //             });
      //         });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms(formSelector, modalTimerId) {
    // Forms
  // 2 Формата FormData и JSON

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  

  forms.forEach((item) => {
    // Подвязываем под каждую форму функцию postData, которая является обработчиком события при отправке
    bindPostData(item);
  });

  function bindPostData(form) {
    // Функция отвечает за привязку постинга
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.classList.add("spinner"); // spinner
      form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage); // куда мы вставляем этот элемент и то что нужно вставить

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // Сначала будем создавать массив массивов, а потом превращаем в классический объект, а потом в JSON, а потом отправляем на сервер

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json) // Вернется Promis, который мы обработаем с помощью then
        .then((data) => {
          console.log(data); // data - те данные, которые возвращаются из промиса
          showThanksModal(message.success);
          statusMessage.remove(); // Используется только для loading
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    // Показывает нам message
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove("hover");
  modal.classList.add("show");
  document.body.style.overflow = "hidden"; // Стиль, который не позволяет прокручивать страницу

  console.log(modalTimerId)
  if (modalTimerId) {
    clearInterval(modalTimerId); // Очищает интервал, если пользователь открыл модальное окно сам
  }
  
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hover");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modal = document.querySelector(modalSelector),
    modalTrigger = document.querySelectorAll(triggerSelector);

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId)); // Нужно обязательно класть функцию в () =>, иначе наша функция вызовется после загрузки страницы 
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll); // Удаляем модальное окно после 1-го появления
    }
  }
  window.addEventListener("scroll", showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector), // табы
        tabsContent = document.querySelectorAll(tabsContentSelector), // карточки с едой
        tabParent = document.querySelector(tabParentSelector); // для делегирования в табах

  function hideTableContent() {
    tabsContent.forEach((item) => {
      // Скрывает карточки с едой и добавляет fade
      item.classList.add("hide", "fade");
      item.classList.remove("show");
    });

    tabs.forEach((item) => {
      // перебирает и удаляет класс активности у табов
      item.classList.remove(activeClass);
    });
  }

  function showTableContent(i = 0) {
    // Определяет какая карточка и таб будет отображаться
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show");
    tabs[i].classList.add(activeClass);
  }

  hideTableContent();
  showTableContent();

  tabParent.addEventListener("click", (event) => {
    const target = event.target; // Чтобы переиспользовать эту конструкцию
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTableContent();
          showTableContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // Timer
  // 1000 * 60 = получаем кол миллисекунд в 1 минуте
  // 1000 * 60 * 60 = получаем кол миллисекунд в 1 часе
  // 1000 * 60 * 60  * 24 = получаем кол сколько в сутках будет миллисекунд
  /* console.log(Date.parse('2024-01-02'));
        console.log(Date.parse(new Date())); */


  function getTimeRemaining(endtime) {
    // определяет разницу между дедлайном и текущим временем
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))), // Math.floor округление до ближайшего целого. Получим, сколько суток осталось до окончания этой даты
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)), // Math.floor((t / 1000 * 60 * 60)) Общее количество часов
        (minutes = Math.floor((t / 1000 / 60) % 60)), // % - 60, потому что в одной минуте 60 секунд
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    // Установим наши часы на страницу
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock(); // Функция инициализации, запустит текущую дату

    function updateClock() {
      // обновляет наш таймер каждую секунду
      const t = getTimeRemaining(endtime); // Рассчет времени, который остался прямо на эту секунду

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    // функция postData настраивает наш запрос fetchit, получает какой-то ответ от сервера и после этого трансформирует ответ в JSON
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data, // Если нужно в не json формате, то просто formData без header
    }); // await ждет когда код обработается

    return await res.json(); // Возвращаем promis из fetch и обрабатываем методом json
  };

  //создаем фун-ию для GET запроса (ур. 59)
async function getResource(url) {
  let res = await fetch(url);

  if (!res.ok){
      throw new Error (`Could not fetch ${url}, ${res.status}`);
  }
  
  return await res.json ();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");







 // импортируем функцию openmodal

window.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal'), 3000); // Мы будем создавать modalTimerId, которая записывает себе уникальный id таймера, который выполнится через опред время и здесь будет запускаться функция openModal

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", '2024-06-11');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map