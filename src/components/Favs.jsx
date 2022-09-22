import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Favs() {

    const [favMovies, setFavMovies] = useState([])
    const [reload, setReload] = useState(false)


    const urlMovie = "https://image.tmdb.org/t/p/w500/"

    useEffect(() => {
        const favs = localStorage.getItem("favs")
        if (favs != null) {
            const favsLcl = JSON.parse(favs)
            setFavMovies(favsLcl);
        } else {
            console.log("No movies");
        }
    }, [reload])


    const favsMovies = localStorage.getItem("favs")
    let tempFavMovies

    if (favsMovies === null) {
        tempFavMovies = []
    } else {
        tempFavMovies = JSON.parse(favsMovies)
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
        } else {
            let moviesLeft = tempFavMovies.filter(i => i.id !== movieData.id)
            localStorage.setItem('favs', JSON.stringify(moviesLeft))
        }

        setReload(!reload)

    }

    return (

        <div className="row d-flex justify-content-center align-items-center m-2 gap-5 favs">
            <h1 className="text-center titles">Favorites Movies</h1>
            {favMovies.map((movie) => (

                <div key={movie.id} className="card mb-3 col-10 col-sm-12 col-md-5 col-xl-3 rounded-5 "
                    style={{
                        backgroundImage: `url("${urlMovie + movie.img}")`,
                        backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
                    }}>
                    <div className="card-img-top imgCard" alt={movie.title} />
                    <div className="card-body d-flex justify-content-around align-items-center cardB rounded-5">
                        <div className="d-flex flex-column">
                            <h5 className="card-title">{movie.title.substring(0, 30)}</h5>
                            <p>{movie.overview.substring(0, 100) + "..."}</p>
                            <img className="imgFake" src={urlMovie + movie.poster_path} alt="" />
                            <button id={movie.id} onClick={likeDislike} className="favoriteBtn">💔</button>
                        </div>

                        <Link key={movie.id} to={`/detail/${movie.id}`}>
                            <button className="btn btn-danger">Detail</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>

    )
}