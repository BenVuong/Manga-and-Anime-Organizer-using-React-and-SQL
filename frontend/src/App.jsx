import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Create from "./Create";
import Read from "./Read";
import Edit from "./Edit"
import AnimeList from "./animeList";
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Home/>}/>
                <Route path="/create" element= {<Create/>}/>
                <Route path="/read/:id" element={<Read/>}/>
                <Route path="/edit/:id" element={<Edit/>}/>
                <Route path="/animeList" element={<AnimeList/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App