export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

/**проверка статуса ошибки*/
const checkError = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

/**загрука фильмов с сервера */
export const getInitialMovies = () => {
  return fetch(`${MOVIES_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkError);
};
