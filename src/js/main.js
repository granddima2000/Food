'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items')
    
    function hideTableContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide', 'fade');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
           
    }

    function showTableContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');
        tabs[i].classList.add('tabheader__item_active')
    }


    tabParent.addEventListener('click', (event) => {
        const target = event.target; // Чтобы переиспользовать эту конструкцию
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTableContent();
                    showTableContent(i);
                }
            })
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

    function getTimeRemaining(endtime) { // определяет разницу между дедлайном и текущим временем
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t/(1000*60*60*24) ), // Math.floor округление до ближайшего целого. Получим, сколько суток осталось до окончания этой даты
            hours = Math.floor( (t/(1000*60*60) % 24) ), // Math.floor((t / 1000 * 60 * 60)) Общее количество часов 
            minutes = Math.floor( (t/1000/60) % 60), // % - 60, потому что в одной минуте 60 секунд
            seconds = Math.floor( (t/1000) % 60);
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

    function setClock(selector, endtime) { // Установим наши часы на страницу
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); // Функция инициализации, запустит текущую дату

        function updateClock() { // обновляет наш таймер каждую секунду
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
  
    function openModal () {
        modal.classList.remove('hover');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Стиль, который не позволяет прокручивать страницу
        clearInterval(modalTimerId) // Очищает интервал, если пользователь открыл модальное окно сам
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal); 
    });

    
    function closeModal () {
        modal.classList.add('hover');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
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
            this.parent = document.querySelector(parentSelector)
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
                element.classList.add(this.classes)
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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        9,
        '.menu .container'
    ).render();
    

    // Forms
    // 2 Формата FormData и JSON

   const forms = document.querySelectorAll('form');

   const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => { // Подвязываем под каждую форму функцию postData, которая является обработчиком события при отправке
    postData(item);
   });
   
   function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add('spinner'); // spinner 
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage); // куда мы вставляем этот элемент и то что нужно вставить

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json); // Отправляем на основании формы, которую мы заполнили

            request.addEventListener('load', () => { // взаимодействие
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove(); // Используется только для loading
                } else {
                    showThanksModal(message.failure);
                }
             });
        });
   }
    
   function showThanksModal(message) {
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
});

