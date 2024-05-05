import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
function EditAnime(){

    const {id} = useParams();
   
    const [values, setValues] = useState({
        title: '',
        episodesWatched: '',
        episodeCount: '',
        score: '',
        synopsis: '',
        image:''
    })
    const navigate = useNavigate();
    
    const handleUpdate = event => {
        event.preventDefault();
        axios.put('http://localhost:8081/editanime/'+id, values)
        .then(res=> {
            console.log(res)
            navigate('/animeList')
        }).catch(err=> console.log(err));
    }

  

    useEffect(()=>{
        axios.get('http://localhost:8081/readanime/'+id)
        .then(res => {console.log(res)
            setValues({...values, 
                    title: res.data[0].title, 
                    episodesWatched: res.data[0].episodesWatched,
                    episodeCount: res.data[0].episodeCount, 
                    score: res.data[0].score,
                    synopsis: res.data[0].synopsis,
                    image: res.data[0].image
                    
                });
        })
        .catch(err=> console.log(err))
    }, [])
    return (
        <div>
        <div>
            <form onSubmit={handleUpdate}>
                <h2>Update Anime</h2>
                <div className='mb-2'>
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder='Enter Title' className='form-control'
                    value={values.title}
                    onChange={e => setValues({...values, title: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Episodes Watched</label>
                    <input type="number" placeholder='Enter amount' className='form-control'
                    value={values.episodesWatched}
                    onChange={e => setValues({...values, episodesWatched: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Episode Count</label>
                    <input type="number" placeholder='Enter amount' className='form-control'
                    value={values.episodeCount}
                    onChange={e => setValues({...values, episodeCount: e.target.value})}/>
                </div>

                <div className='mb-2'>
                    <label htmlFor="">Synopsis</label>
                    <input type="text" placeholder='Enter Synopsis' className='form-control'
                    value={values.synopsis}
                    onChange={e => setValues({...values, synopsis: e.target.value})}/>
                </div>

                <div className='mb-2'>
                    <label htmlFor="">Thumbnail Art</label>
                    <input type="text" placeholder='Enter link to thumbnail art' className='form-control'
                    value={values.image}
                    onChange={e => setValues({...values, image: e.target.value})}/>
                </div>

                <div className='mb-2'>
                    <label htmlFor="">Score</label>
                        <select name="selectedScore" 
                        value={values.score}
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
                <button className="btn btn-success"> Update</button>
                <Link to ="/animeList" className='btn btn-success'> Back</Link>
            </form>
        </div>
    </div>
    )
}

export default EditAnime