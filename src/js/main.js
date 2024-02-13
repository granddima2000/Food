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
          modalTrigger = document.querySelectorAll('[data-modal]'),
          modalCloseBtn = document.querySelector('[data-close]');
  
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
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }
    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

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
    

    // FORMS 
    // 2 Формата FormData и JSON

    // FormData формат формирует просто ключ-значение
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжимся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => { // На каждую форму будет подвязана функция postData с обработчиком события при отправке
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);


            const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); // метод и путь на который будем ссылаться 

            // request.setRequestHeader('Content-type', 'multipart/form-data'); // Заголовок. Говорит серверу, а что именно приходит
            const formData = new FormData(form); // Во внутрь мы помещаем form из которой нам нужно собрать данные

            request.send(formData); // отправляем formData, которая выше была заполнена 

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove(), // Удаляет блок со страницы
                    }, 2000);
                    statusMessage.textContent = message.success;
                } else {
                    statusMessage.textContent = message.failure;
                    setTimeout(() => {
                        statusMessage.remove(),
                    }, 2000);
                }
            });
        });
    }
});

