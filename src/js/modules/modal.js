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

export default modal;
export {closeModal, openModal};