import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from '@sweetalert/with-react'


export default function List(prop) {


   const favMovies = localStorage.getItem("favs")
    let tempFavMovies

    if (favMovies === null) {
        tempFavMovies = []
    } else {
        tempFavMovies = JSON.parse(favMovies)
    }

    const likeDislike = (e) => {
        const btn = e.currentTarget;
        const parent = btn.parentElement;
        const title = parent.querySelector('h5').innerText;
        const overview = parent.querySelector('p').innerText;
        const img = parent.querySelector('img').getAttribute('src')
        const movieData = {
            title, overview, img,
            id: e.target.id
        }
        let movieInLcstg = tempFavMovies.find(i => i.id === movieData.id)
        if (!movieInLcstg) {
            tempFavMovies.push(movieData)
            localStorage.setItem('favs', JSON.stringify(tempFavMovies))
            Swal("❤ "+movieData.title+" has been added to favs movies");
        } else {
            let moviesLeft = tempFavMovies.filter(i => i.id !== movieData.id)
            localStorage.setItem('favs', JSON.stringify(moviesLeft))
            Swal("💔 " + movieData.title+" has been removed from your favorites");
        }

    } 


    const urlMovie = "https://image.tmdb.org/t/p/w500/"

    const [loading, setLoading] = useState();
    const [movies, setMovies] = useState([])
    const [num, setNum] = useState(1)


    const add = () => {
        if (num < 20) {
            setNum(num + 1);
        }
    };
    //funcion restar
    const subtract = () => {
        if (num >= 2) {
            setNum(num - 1);
        }
    };


    useEffect(() => {
        setLoading(true)
/*         const token = localStorage.getItem("token")
        if (token === null) {
            navigate("/");
        } */

        getMovies()
        setLoading(false)
    }, [movies])

    async function getMovies() {
        await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=da105d94ec008192c58e8fcad8b05171&language=es-MX&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&with_watch_monetization_types=flatrate`)
            .then(res => setMovies(res.data.results))
            .catch(error => {
                Swal(<h1>Error in the api, try later</h1>)
            })
    }



    return (

        <>
            {loading ?

                <div className="loading d-flex justify-content-center align-items-center">
                    <img
                        src="https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                        alt="loading"
                    ></img>
                </div>

                :
                <div className="row d-flex justify-content-center align-items-center m-2 gap-5">
                    <h1 className="text-center titles">Movies</h1>
                    {movies.map((movie) => (

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
                                    <img className="imgFake" src={urlMovie + movie.poster_path} alt="" />
                                    <button id={movie.id} onClick={likeDislike} className="favoriteBtn">🧡</button>
                                </div>

                                <Link key={movie.id} to={`/detail/${movie.id}`}>
                                    <button className="btn btn-danger">Detail</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                    <div className="buttonsFilm d-flex justify-content-between align-items-center">
                        <button className="btn btn-danger" onClick={subtract}>Prev</button>
                        <button className="btn btn-primary" onClick={add}>Next</button>
                    </div>

                </div>
            }



        </>

    )
}

