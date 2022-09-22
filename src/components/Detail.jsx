import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'


export default function Detail() {


    const [movie, setMovie] = useState([])
    const urlMovie = "https://image.tmdb.org/t/p/w500/"


    const { id } = useParams()

    useEffect(() => {

        const endpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=da105d94ec008192c58e8fcad8b05171&language=es-MX`
        axios
            .get(endpoint)
            .then(res => setMovie(res.data))
    }, [])


    return (
        <>

            <div className="d-flex detail align-items-center justify-content-around flex-column flex-xl-row">
                <div className='p-2 m-2'>
                    <img className="imgDetail rounded-5" src={urlMovie + movie.poster_path} alt={movie.title} />
                </div>
                <div className='p-4 m-2 detailTwo'>
                    <h5>{movie.title}</h5>
                    <p>{movie.overview}</p>
                    <p>Release: {movie.release_date}</p>
                    <h5>Genders</h5>
                    {movie?.genres ? movie?.genres.map((item, index) => (
                        <ul key={index}>
                            <li>{item.name}</li>
                        </ul>
                    )) : null
                    }


                </div>
            </div>

        </>
    )
}