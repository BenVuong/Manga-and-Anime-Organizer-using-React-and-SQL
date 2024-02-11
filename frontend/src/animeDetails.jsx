import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
function AnimeDetails(){
    const [animeList, setAnimeList] = useState([]);
    const [animeName, setAnimeName] = useState();
    let a = ""
    useEffect(() => {
        const storedAnime = JSON.parse(localStorage.getItem('anime'));
        if (storedAnime) {
            setAnimeList(storedAnime);
             a = animeList.find((person=>person.name==="Lucky Star"))
            console.log(a)
            setAnimeName(JSON.stringify(a))
            
        }

      }, []);

        
    return(
        <div> 
          
            {animeName}
            
           
        </div>
    );
}

export default AnimeDetails;
