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

export {postData};
export {getResource};