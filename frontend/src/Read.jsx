import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

function Read() {
    const {id} = useParams();
    const [book, setBook] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {console.log(res)
            setBook(res.data[0]);
        })
        .catch(err=> console.log(err))
    }, [])
    return(
        <div>
            <h2>Manga details</h2>
            <h3>ID: {book.id}</h3>
            <h3>Manga Title: {book.name}</h3>
            <h3>Amount of volumes collected: {book.amountCollected}</h3>
            <h3>Total Amount of Volumes: {book.volAmount}</h3>
            <Link to ="/" className='btn btn-success'> Back</Link>
            <button> Edit</button>
        </div>
    )
}

export default Read