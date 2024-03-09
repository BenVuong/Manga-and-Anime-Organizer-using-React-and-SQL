import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

function AnimeDetails() {
    const {id} = useParams();
    const [anime, setAnime] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/readanime/'+id)
        .then(res => {console.log(res)
            setAnime(res.data[0]);
        })
        .catch(err=> console.log(err))
    }, [])
    return(
        <div className='p-3 mb-2 bg-secondary text-white'>
            <h2>Anime details</h2>
            <h3>ID: {anime.id}</h3>
            <h3>Anime Title: {anime.title}</h3>
            <h3>Epsisodes Watched: {anime.episodesWatched}</h3>
            <h3>Epsisodes Count: {anime.episodeCount}</h3>
            

            <Link to ="/animeList" className='btn btn-success'> Back</Link>
            <Link  className="btn btn-outline-dark "
 role="button" to={`/editanime/${anime.id}`}>Edit</Link>
 
        </div>
    )
}

export default AnimeDetails