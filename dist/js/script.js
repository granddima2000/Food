/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/


window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabParent = document.querySelector('.tabheader__items');
  function hideTableContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide', 'fade');
      item.classList.remove('show');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }
  function showTableContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show');
    tabs[i].classList.add('tabheader__item_active');
  }
  tabParent.addEventListener('click', event => {
    const target = event.target; // Чтобы переиспользовать эту конструкцию
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTableContent();
          showTableContent(i);
        }
      });
    }
  });
  hideTableContent();
  showTableContent();

  // Timer
  // 1000 * 60 = получаем кол миллисекунд в 1 минуте
  // 1000 * 60 * 60 = получаем кол миллисекунд в 1 часе
  // 1000 * 60 * 60  * 24 = получаем кол сколько в сутках будет миллисекунд
  /* console.log(Date.parse('2024-01-02'));
  console.log(Date.parse(new Date())); */

  const deadline = '2024-02-02';
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
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      // Math.floor округление до ближайшего целого. Получим, сколько суток осталось до окончания этой даты
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      // Math.floor((t / 1000 * 60 * 60)) Общее количество часов 
      minutes = Math.floor(t / 1000 / 60 % 60),
      // % - 60, потому что в одной минуте 60 секунд
      seconds = Math.floor(t / 1000 % 60);
    }
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
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
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
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
  setClock('.timer', deadline);

  // Modal 

  const modal = document.querySelector('.modal'),
    modalTrigger = document.querySelectorAll('[data-modal]');
  function openModal() {
    modal.classList.remove('hover');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Стиль, который не позволяет прокручивать страницу
    clearInterval(modalTimerId); // Очищает интервал, если пользователь открыл модальное окно сам
  }
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  function closeModal() {
    modal.classList.add('hover');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 50000);
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll); // Удаляем модальное окно после 1-го появления
    }
  }
  window.addEventListener('scroll', showModalByScroll);

  // Используем классы для карточек

  class MenuCard {
    constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.subtitle = subtitle;
      this.descr = descr;
      this.price = price;
      this.classes = classes; // menu__item
      this.parent = document.querySelector(parentSelector);
      this.tranfer = 89;
      this.changeToRub();
    }
    changeToRub() {
      this.price = this.price * this.tranfer;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
      this.parent.append(element);
    }
  }

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

  axios.get('http://localhost:3000/menu') // библиотека axios
  .then(data => {
    data.data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });

  // getResource('http://localhost:3000/menu') // Способ при котором мы лишаемся шаблонизации и this нам не нужен
  //     .then(data => createCard(data));

  // function createCard(data) {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //         const element = document.createElement('div');

  //         element.classList.add('menu__item');
  //         price = price * 98;
  //         element.innerHTML = `
  //             <img src=${img} alt=${altimg}>
  //             <h3 class="menu__item-subtitle">${title}</h3>
  //             <div class="menu__item-descr">${descr}</div>
  //             <div class="menu__item-divider"></div>
  //             <div class="menu__item-price">
  //                 <div class="menu__item-cost">Цена:</div>
  //                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
  //             </div>
  //         `;

  //         document.querySelector('.menu .container').append(element);
  //     });
  // }

  // Forms
  // 2 Формата FormData и JSON

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  const postData = async (url, data) => {
    // функция postData настраивает наш запрос fetchit, получает какой-то ответ от сервера и после этого трансформирует ответ в JSON
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data // Если нужно в не json формате, то просто formData без header
    }); // await ждет когда код обработается

    return await res.json(); // Возвращаем promis из fetch и обрабатываем методом json
  };
  forms.forEach(item => {
    // Подвязываем под каждую форму функцию postData, которая является обработчиком события при отправке
    bindPostData(item);
  });
  function bindPostData(form) {
    // Функция отвечает за привязку постинга 
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.classList.add('spinner'); // spinner 
      form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage); // куда мы вставляем этот элемент и то что нужно вставить

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries())); // Сначала будем создавать массив массивов, а потом превращаем в классический объект, а потом в JSON, а потом отправляем на сервер

      postData('http://localhost:3000/requests', json) // Вернется Promis, который мы обработаем с помощью then
      .then(data => {
        console.log(data); // data - те данные, которые возвращаются из промиса
        showThanksModal(message.success);
        statusMessage.remove(); // Используется только для loading
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  function showThanksModal(message) {
    // Показывает нам message 
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  // Slider

  const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width; // из window.getComputedStyle(slidesWrapper) вернется объект и мы получаем оттуда только width

  let slideIndex = 1;
  let offset = 0;
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }
  slidesField.style.width = 100 * slides.length + '%'; // Получаем кишку и закидываем во внутрь slidesField
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
    // Устанавливаем ширину строгую
    slide.style.width = width;
  });
  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      // '650px'
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`; // Сдвигаем

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`; // Сдвигаем

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });
});
/******/ })()
;
//# sourceMappingURL=script.js.map