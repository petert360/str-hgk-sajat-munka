const MovieAPI = require('./movie.api');

module.exports = class MovieService {
    constructor() {
        this.api = new MovieAPI('./database/movies.json', 'movies');
        this.movies = null;
        this.init();
    }

    async init() {
        this.movies = await this.api.get();
    }

    async getAllMovies() {
        if (!this.movies) {
            await this.init();
        }
        
        return this.movies;
    }

    async getMovie(id) {
        if (!this.movies) {
            await this.init();
        }

        return this.movies.filter(
            movie => movie.id === id
        )[0];
    }

    async createMovie({producer, title}) {
        if (!this.movies) {
            await this.init();
        }
        
        const sortedMovies = [...this.movies].sort((a, b) => a.id > b.id);
        const newMovieId = sortedMovies[sortedMovies.length - 1].id + 1;

        const movie = { id: newMovieId, producer, title };
        this.movies = [...this.movies, movie];
        await this.api.save(this.movies);
        return movie;
    }

    async editMovie ({ id, producer, title }) {
        if (!this.movies) {
            await this.init();
        }

        this.movies = this.movies.map(movie => movie.id === id
            ? { id, producer, title }
            : movie)
        await this.api.save(this.movies)
        return this.getMovie(id)
    };

    async removeMovie (id) {
        if (!this.movies) {
            await this.init();
        }

        this.movies = this.movies.filter(movie => movie.id !== id)
        await this.api.save(this.movies)
    };


}