import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
function EditAnime(){

    const {id} = useParams();
   
    const [values, setValues] = useState({
        title: '',
        episodeCount: ''
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
                    episodeCount: res.data[0].episodeCount, 
                    
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
                    <label htmlFor="">Episode</label>
                    <input type="number" placeholder='Enter amount' className='form-control'
                    value={values.episodeCount}
                    onChange={e => setValues({...values, episodeCount: e.target.value})}/>
                </div>
                <button className="btn btn-success"> Update</button>
                <Link to ="/animeList" className='btn btn-success'> Back</Link>
            </form>
        </div>
    </div>
    )
}

export default EditAnime