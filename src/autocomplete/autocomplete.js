import React from 'react';
import styles from './style.module.css';
import MovieIcon from './movieIcon';
import SearchIcon from './searchIcon';
import movieIcon from '../icons/movie.svg';
import searchIcon from '../icons/search.svg';

class Search extends React.Component {

    state = {
        results: [],
        term: '',
        error: '',
        active: false
    };

    Max_Results = 8;

    renderMovies = () => {
        return this.state.results.map(result => {
            return (
                <div className={styles.results_container} key={result.id}
                     onClick={this.SelectedMovie.bind(this, result.title)}>
                    <span>{result.title}</span>
                    <div>{result.vote_average} Rating, {result.release_date}</div>
                </div>
            )
        });
    }

    handleErrors(response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    }


    fetchAPI = text => {
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=80424ff2d560f8c489fc7455c20a644a&language=en-US' + `&query=${(text)}`

        fetch(url)
            .then(this.handleErrors)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    results: data.results.slice(0, this.Max_Results),
                    error: data.results.length < 1 ? 'No results.' : ''
                })
            )

    }

    SelectedMovie = title => {
        this.setState({
            term: title,
            results: [],
            active: false,
            error: ''
        });
    }

    handleChange = e => {
        const value = e.target.value;
        this.setState({
            results: value.length >= 3 ? this.state.results : [],
            term: value,
            active: value.length > 0,
            error: value.trim().length < 3 ? "Enter at least 3 characters." : ""
        });
        if (value.trim().length >= 3)
            this.fetchAPI(value);
    }


    render() {
        const {error, active, term} = this.state;
        return <div styleName={styles.container}>
            <div className={styles.form_container}>
                <div className={styles.movie_icon }>
                   <img src={movieIcon} alt={""}></img>
                </div>
                <div className={styles.search_container}>
                    <div className={styles.input_container}>
                        {active }
                        <input
                            placeholder="Enter movie name"
                            onChange={this.handleChange}
                            className={active ? styles.active_input : styles.passive_input}
                            value={term}
                        />
                    </div>
                    {active && <div className={styles.enter_movie_name}>Enter a movie name</div>}
                    {error && active && <div className={styles.error}>{error}</div>}
                    {!error && active && this.renderMovies()}
                </div>
                {!active && <div className={styles.search_icon}>
                    <img src={searchIcon} alt={""}></img>
                </div>}
            </div>
        </div>
    }
}


export default Search;



