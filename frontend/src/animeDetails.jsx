import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const Title = styled('div')(({ theme }) => ({
    backgroundColor: '#616161' ,
    border: '1px solid',
    color: '#fff',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'left',
    fontSize: '30px'
  }));

  const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'left',
  }));

  const Pillar = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'left',
  }));

function AnimeDetails() {
    const {id} = useParams();
    const [anime, setAnime] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/readanime/'+id)
        .then(res => {console.log(res)
            setAnime(res.data[0]);
        })
        .catch(err=> console.log(err))
    }, [])
    return(
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Title>{anime.title}</Title>
                </Grid>
                <Grid xs={12} sm={2}>
                    <Pillar>
                        <Item>
                            <img src={anime.image}/>
                            
                        </Item>
                        <Item>
                            Information:
                            <Divider/>
                            Episodes: {anime.episodeCount}
                        </Item>
                        
                        
                        <Item>
                            <Link to ="/animeList" className='btn btn-success'> Back</Link>
                            <Link  className="btn btn-outline-dark "
 role="button" to={`/editanime/${anime.id}`}>Edit</Link>
                        </Item>
                    </Pillar>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Item>Score: {anime.score}</Item>
                    <Item>Progress: {anime.episodesWatched}</Item>
                    <Item>Synopsis:
                        <Divider/>
                         {anime.synopsis}</Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AnimeDetails