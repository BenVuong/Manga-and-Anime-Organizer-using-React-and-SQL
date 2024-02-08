import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
function AnimeList() {
  const [anime, setAnime] = useState([]);
  const [newAnimeName, setNewAnimeName] = useState('');
  const [newEpsiodeCount, setNewEpisodeCount] = useState('');
  const [newStatus, setNewStatus] = useState('')
  const [editIndex, setEditIndex] = useState(null);

  const statusOptions = [
    "Currently Watching",
    "Completed",
    "On-Hold",
    "Dropped",
    "Plan to Watch",
  ];

  const statusChangeHandler = (e) => {

   
      setNewStatus(e.target.value);
    
  }  

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
    if (newAnimeName && newEpsiodeCount && newStatus) {
      if (editIndex === null) {
        setAnime([...anime, { name: newAnimeName, episodeCount: newEpsiodeCount, stat: newStatus }]);
      } else {
        const updatedAnime = [...anime];
        updatedAnime[editIndex] = {  name: newAnimeName, episodeCount: newEpsiodeCount, stat: newStatus };
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
        <select onChange={statusChangeHandler}>
            <option value={""}>Select Status</option>
            {statusOptions.map((option, index) =>
            {
              return(
                <option key={index}>
                  {option}
                </option>
              );
            })}
        </select>
        <button onClick={handleAddAnime}>{editIndex !== null ? 'Update Anime' : 'Add Anime'}</button>
      </div>
        <table>
          <thead>
            <tr>
              <th>Title </th>
              <th>Episode Count </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {anime.map((animes, index) => (
              <tr key={index}>
                <td>{animes.name}</td>
                <td>{animes.episodeCount}</td>
                <td>{animes.stat}</td>
                <td>
                  <button onClick={() => handleEditAnime(index)}>Edit</button>
                  <button onClick={() => handleDeleteAnime(index)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default AnimeList;