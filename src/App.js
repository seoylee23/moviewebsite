import React from "react";
import axios from "axios";
import Movie from './Movie';
import './App.css';
import Footer from './Footer';
import Header from './Header';

class App extends React.Component {

  state = {
    isLoading: true,
    movies: [],
  };
  

  getMovies = async () => {
    const {
      data: {
        data: {movies},
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({movies, isLoading: false});
  }


  componentDidMount() {
    // 영화 데이터 로딩!
    this.getMovies();
  }


  render() {
    const { isLoading,movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">"Loading/.."</span>
          </div>
        ) : (
          <>np<div>
              <Header />
            </div>
            <div className="movies">
                {movies.map(movie => (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    title={movie.title}
                    summary={movie.summary}
                    poster={movie.large_cover_image}
                    genres={movie.genres} />
                ))}
                <Footer />
              </div></>
    )}
  </section>
    );
  }
}


export default App;