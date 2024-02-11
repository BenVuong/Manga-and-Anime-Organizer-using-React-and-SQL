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
             a = animeList.find((person=>person.name==="Eureka 7"))
            console.log(a)
            setAnimeName(JSON.stringify(a))
            for(const[key, value] of Object.entries(a)){
                console.log(`${key}: ${value}`);
                //map.set(key,value)
            }
            
        }

      }, []);

        
    return(
        <div> 
           
            
            
           
        </div>
    );
}

export default AnimeDetails;
