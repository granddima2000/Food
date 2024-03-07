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

export default tabs;