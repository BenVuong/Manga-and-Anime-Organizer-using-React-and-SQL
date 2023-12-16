import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
function Home() {
    const [data, setData]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err=> console.log(err));
    },[])
    return(
     <div>
        <h1>
            Manga Collection
        </h1>
        <div className="d-flex justify-content">
            <Link to ="/create" className='btn btn-success'> Create +</Link>
        </div>
        <div>
            <table>
                <thead>
                   <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Amount Collected</th>
                        <th>Total Amount of Volumes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((book, index)=> {
                            return <tr key={index}>
                                <td> {book.id}</td>
                                <td> {book.name}</td>
                                <td> {book.amountCollected}</td>
                                <td> {book.volAmount}</td>
                                <td>
                                    <button>Edit</button>
                                    <button> Delete</button>
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