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

export default timer;