import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function CreateAnime(){
    const [values, setValues] = useState({
        title: '',
        episodesWatched: '',
        episodeCount: '',
        score: '',
        synopsis: '',
        image: ''
    })
    const [searchAnimeName, setSearchAnimeName] = useState()
    const [englishTitle, setEnglishTitle] = useState()
    const animeName = "Paranoia Agent"
    const API_URL = 'https://api.jikan.moe/v4'
    async function searchAnime(search) {
        const response = await fetch(`${API_URL}/anime?q=${search}`);
        const animeData = await response.json();
        console.log(animeData.data[0].title_english);
        setValues({...values, 
            title: animeData.data[0].title_english,
            episodeCount: animeData.data[0].episodes,
            synopsis: animeData.data[0].synopsis,
            image: animeData.data[0].images.jpg.image_url
            
        });
      }
    
    useEffect(()=>{
        
        
    }, [])
    

    const navigate = useNavigate();
 
    const handleSearchSubmit = (e)=> {
        e.preventDefault()
        searchAnime(searchAnimeName)
        axios.post('http://localhost:8081/anime', values)
        .then(res =>{
            console.log(res);
            navigate('/animeList')
        })
        .catch(err=>console.log(err))
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        axios.post('http://localhost:8081/anime', values)
        .then(res =>{
            console.log(res);
            navigate('/animeList')
        })
        .catch(err=>console.log(err))
    }
    return(
        <div>
            <h2>Add Anime</h2>
            <div>
                <form onSubmit={handleSearchSubmit}>
                    <div className='mb-2'>
                        <label htmlFor="">Search Anime Automatically</label>
                        <input type="text" placeholder="Enter anime name and info will be filled in automatically"
                        className='form-control' onChange={e=>setSearchAnimeName(e.target.value)}>
                        </input>
                        <button className="btn btn-success"> Submit</button>
                    </div>
                </form>

                <form onSubmit={handleSubmit}>
                    
                    <div className='mb-2'>
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder='Enter Title' className='form-control'
                        onChange={e => setValues({...values, title: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Episodes Watched</label>
                        <input type="number" placeholder='Enter amount' className='form-control'
                        onChange={e => setValues({...values, episodesWatched: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Episode Count</label>
                        <input type="number" placeholder='Enter amount' className='form-control'
                        onChange={e => setValues({...values, episodeCount: e.target.value})}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Synopsis</label>
                        <input type="text" placeholder='Enter Synopsis' className='form-control'
                        onChange={e => setValues({...values, synopsis: e.target.value})}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Thumbnail Art</label>
                        <input type="text" placeholder='Enter a link to thumbnail art' className='form-control'
                        onChange={e => setValues({...values, image: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                    <label htmlFor="">Score</label>
                        <select name="selectedScore" 
                        onChange={e => setValues({...values, score: e.target.value})}>
                            <option value="">Select Score</option>
                            <option value="10">10 Masterpiece</option>
                            <option value="9">9 Great</option>
                            <option value="8">8 Very Good</option>
                            <option value="7">7 Good</option>
                            <option value="6">6 Fine</option>
                            <option value="5">5 Average</option>
                            <option value="4">4 Bad</option>
                            <option value="3">3 Very Bad</option>
                            <option value="2">2 Horrible</option>
                            <option value="1">1 Appalling </option>
                        </select>
                </div>
                    <button className="btn btn-success"> Submit</button>
                    <Link to ="/animeList" className='btn btn-success'> Back</Link>
                </form>
            </div>
        </div>
    )
}

export default CreateAnime