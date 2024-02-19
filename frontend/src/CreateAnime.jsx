import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function CreateAnime(){
    const [values, setValues] = useState({
        title: '',
        episodeCount: ''
    })
    const navigate = useNavigate();
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
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Add Anime</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder='Enter Title' className='form-control'
                        onChange={e => setValues({...values, title: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Episode Count</label>
                        <input type="number" placeholder='Enter amount' className='form-control'
                        onChange={e => setValues({...values, episodeCount: e.target.value})}/>
                    </div>
                    <button className="btn btn-success"> Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateAnime