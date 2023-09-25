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
export const getInitialMovies = (token) => {
  return fetch(`${MOVIES_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkError);
};

// /**добавление сохраненных фильмов на страницу */
// export const addSavedMovies = (movieData, token) => {
//   return fetch(`${MOVIES_URL}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       name: movieData.name,
//       // link: moviesData.link,
//     }),
//   }).then(checkError);
// };

// /**удаление фильмов */
// export const deleteCard = (movieId, token) => {
//   return fetch(`${BASE_URL}/movies/${movieId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   }).then(checkError);
// };
