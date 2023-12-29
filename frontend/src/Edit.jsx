import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
function Edit(){

    const {id} = useParams();
    {/*TODO: fix bug where when updating total amount of volumes goes to 0 */}
    const [values, setValues] = useState({
        title: '',
        amountCollected: '',
        totalVolumes: ''
    })
    const navigate = useNavigate();

    const handleUpdate = event => {
        event.preventDefault();
        axios.put('http://localhost:8081/edit/'+id, values)
        .then(res=> {
            console.log(res)
            navigate('/')
        }).catch(err=> console.log(err));
    }

    useEffect(()=>{
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {console.log(res)
            setValues({...values, name: res.data[0].name, amountCollected: res.data[0].amountCollected, totalVolumes: res.data[0].volAmount});
        })
        .catch(err=> console.log(err))
    }, [])
    return (
        <div>
        <div>
            <form onSubmit={handleUpdate}>
                <h2>Update Manga</h2>
                <div className='mb-2'>
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder='Enter Title' className='form-control'
                    value={values.name}
                    onChange={e => setValues({...values, title: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Amount collected</label>
                    <input type="number" placeholder='Enter amount' className='form-control'
                    value={values.amountCollected}
                    onChange={e => setValues({...values, amountCollected: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Total number of volumes</label>
                    <input type="number" placeholder='Enter amount' className='form-control'
                     value={values.totalVolumes}
                    onChange={e => setValues({...values, totalVolumes: e.target.value})}/>
                </div>
                <button className="btn btn-success"> Update</button>
                <Link to ="/" className='btn btn-success'> Back</Link>
            </form>
        </div>
    </div>
    )
}

export default Edit