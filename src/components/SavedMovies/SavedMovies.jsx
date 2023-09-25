import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";

function SavedMovies({ loggedIn }) {
  return (
    <>
      <Header loggedIn={!loggedIn} />
      <main className="main">
        <SearchForm />
        <MoviesCardList>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
