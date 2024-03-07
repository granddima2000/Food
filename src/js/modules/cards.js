import { getResource } from "../services/services";

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


export default cards;