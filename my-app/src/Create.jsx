import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Create(){
    const [values, setValues] = useState({
        title: '',
        amountCollected: '',
        totalVolumes: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (e)=> {
        e.preventDefault()
        axios.post('http://localhost:8081/book', values)
        .then(res =>{
            console.log(res);
            navigate('/')
        })
        .catch(err=>console.log(err))
    }
    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Add Manga</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder='Enter Title' className='form-control'
                        onChange={e => setValues({...values, title: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Amount collected</label>
                        <input type="number" placeholder='Enter amount' className='form-control'
                        onChange={e => setValues({...values, amountCollected: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Total number of volumes</label>
                        <input type="number" placeholder='Enter amount' className='form-control'
                        onChange={e => setValues({...values, totalVolumes: e.target.value})}/>
                    </div>
                    <button className="btn btn-success"> Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Create