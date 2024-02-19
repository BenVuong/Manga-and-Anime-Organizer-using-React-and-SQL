import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
function Home() {
    const [data, setData]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/animelist')
        .then(res => setData(res.data))
        .catch(err=> console.log(err));
    },[])

    const handleDelete = (id)=>{
        axios.delete('http://localhost:8081/deleteanime/' + id)
        .then(res => {
            window.location.reload();
        })
        .catch(err=> console.log(err));

    }

    return(
     <div>
        <h1>
            Anime Collection and Tracker
        </h1>
        <div className="d-flex justify-content  ">
            <Link to ="/createanime" className='btn btn-success'> Create +</Link>
        </div>
        <div className="d-flex justify-content  ">
            <Link to ="/" className='btn btn-success'> Manga List </Link>
        </div>
        <div className="p-3 mb-2 bg-secondary text-white">
            <table>
                <thead>
                   <tr>
                        
                        <th>Title</th>
                        <th>Collection Progress</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((anime, index)=> {
                            return <tr key={index}>
                                
                                <td> {anime.title}</td>
                                <td> {anime.episodeCount}</td>
                                <td>
                                   
                                    <button onClick={() =>handleDelete(anime.id)} className="btn btn-danger"> Delete</button>
                                </td>
                            </tr>
                            
                        })
                    }
                </tbody>
            </table>
        </div>
     </div> 
    )
}

export default Home