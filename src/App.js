import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //Fetch API를 사용하여 영화 Data가져오기
  async function fetchMoviesHandler() {
    setIsLoading(true);
    //비동기화 코드로 변환
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releasDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
  }

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* 로딩중이라는 것을 하기위해 useState를 사용해서 isLoading이 false일때는
        MoviesList가 나오고 true일때는 로딩중이라고 나온다. */}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length ===0 && <p>Found no movies...</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
