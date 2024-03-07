import {closeModal, openModal} from "./modal";
import { postData } from "../services/services";

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

      postData("http://localhost:3000/requests", json) // Вернется Promis, который мы обработаем с помощью then
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
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;