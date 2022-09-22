import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom';


export default function Results() {

    let query = new URLSearchParams(window.location.search)
    let results = query.get('keyword')
    const urlMovie = "https://image.tmdb.org/t/p/w500/"
    const [movies, setMovies] = useState()
    console.log(movies);

    useEffect(() => {
       
        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=da105d94ec008192c58e8fcad8b05171&language=es-MX&query=${results}`)
            .then(res => setMovies(res.data.results))
            .catch(err => {
                console.log(err);
            })
    },[])

    return (
        <div className="row d-flex justify-content-center align-items-center m-2 gap-5 results">
            {movies ? movies.map((movie, index) => (
                <div key={movie.id} className="card mb-3 col-10 col-sm-12 col-md-5 col-xl-3 rounded-5 "
                    style={{
                        backgroundImage: `url("${urlMovie + movie.poster_path}")`,
                        backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
                    }}>
                    <div className="card-img-top imgCard" alt={movie.title} />
                    <div className="card-body d-flex justify-content-around align-items-center cardB rounded-5">
                        <div className="d-flex flex-column">
                            <h5 className="card-title">{movie.title.substring(0, 30)}</h5>
                            <p>{movie.overview.substring(0, 100) + "..."}</p>
                        </div>

                        <Link key={movie.id} to={`/detail/${movie.id}`}>
                            <button className="btn btn-danger">Detail</button>
                        </Link>
                    </div>
                </div>
            ))
                :

                <h1>Not found results</h1>

            }
        </div>
    )
}