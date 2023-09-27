export const filterWordMovies = (moviesList, searchWord) => {
  return moviesList.filter((movies) => {
    return (
      movies.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ||
      movies.nameEN.toLowerCase().includes(searchWord.toLowerCase())
    );
  });
};

export const filterShortMovies = (moviesList, isToggle) => {
  if (isToggle) {
    return moviesList.filter((movies) => movies.duration <= 40);
  }
  return moviesList;
};
