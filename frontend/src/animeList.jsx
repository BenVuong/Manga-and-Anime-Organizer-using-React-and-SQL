import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
function AnimeList() {
  const [anime, setAnime] = useState([]);
  const [newAnimeName, setNewAnimeName] = useState('');
  const [newEpsiodeCount, setNewEpisodeCount] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedAnime = JSON.parse(localStorage.getItem('anime'));
    if (storedAnime) {
      setAnime(storedAnime);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('anime', JSON.stringify(anime));
  }, [anime]);

  const handleAddAnime = () => {
    if (newAnimeName && newEpsiodeCount) {
      if (editIndex === null) {
        setAnime([...anime, { name: newAnimeName, episodeCount: newEpsiodeCount }]);
      } else {
        const updatedAnime = [...anime];
        updatedAnime[editIndex] = {  name: newAnimeName, episodeCount: newEpsiodeCount };
        setAnime(updatedAnime);
        setEditIndex(null);
      }
      setNewAnimeName('');
      setNewEpisodeCount('');
    }
  };

  const handleDeleteAnime = (index) => {
    const updatedAnime = [...anime];
    updatedAnime.splice(index, 1);
    setAnime(updatedAnime);
  };

  const handleEditAnime = (index) => {
    const animeToEdit = anime[index];
    setNewAnimeName(animeToEdit.name);
    setNewEpisodeCount(animeToEdit.episodeCount);
    setEditIndex(index);
  };

  return (
    <div>
      <h1>Anime List</h1>
      <div className="d-flex justify-content  ">
            <Link to ="/" className='btn btn-success'> Manga List </Link>
        </div>
      <div>
        <input
          type="text"
          placeholder="Enter Anime Name"
          value={newAnimeName}
          onChange={(e) => setNewAnimeName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter episode count"
          value={newEpsiodeCount}
          onChange={(e) => setNewEpisodeCount(e.target.value)}
        />
        <button onClick={handleAddAnime}>{editIndex !== null ? 'Update Anime' : 'Add Anime'}</button>
      </div>
      <ul>
        {anime.map((animes, index) => (
          <li key={index}>
            
            <span>{animes.name} - {animes.episodeCount}</span>
            <button onClick={() => handleEditAnime(index)}>Edit</button>
            <button onClick={() => handleDeleteAnime(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimeList;
