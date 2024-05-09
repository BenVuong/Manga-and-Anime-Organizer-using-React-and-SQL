import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function CreateAnime() {
  const [values, setValues] = useState({
    title: "",
    episodesWatched: "",
    episodeCount: "",
    score: "",
    synopsis: "",
    image: "",
    type: "",
    status: "",
    studio: "",
  });
  const [searchAnimeName, setSearchAnimeName] = useState("");

  const API_URL = "https://api.jikan.moe/v4";
  async function searchAnime(search) {
    const response = await fetch(`${API_URL}/anime?q=${search}`);
    const animeData = await response.json();
    console.log(animeData.data[0]);
    setValues({
      ...values,
      title: animeData.data[0].title_english,
      episodeCount: animeData.data[0].episodes,
      synopsis: animeData.data[0].synopsis,
      image: animeData.data[0].images.jpg.image_url,
      type: animeData.data[0].type,
      studio: animeData.data[0].studios[0].name,
    });
  }

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchAnimeName === "") {
    } else {
      searchAnime(searchAnimeName);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/anime", values)
      .then((res) => {
        console.log(res);
        navigate("/animeList");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Add Anime</h2>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <div className="mb-2">
            <label htmlFor="">Search Anime Automatically</label>
            <input
              type="text"
              placeholder="Enter title of an anime and its info will be auto filled "
              className="form-control"
              onChange={(e) => setSearchAnimeName(e.target.value)}
            ></input>
          </div>
          <button className="btn btn-success"> Search Anime</button>
        </form>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="form-control"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Episodes Watched</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, episodesWatched: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Episode Count</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="form-control"
              value={values.episodeCount}
              onChange={(e) =>
                setValues({ ...values, episodeCount: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Studio</label>
            <input
              type="text"
              placeholder="Enter in Studio"
              className="form-control"
              value={values.studio}
              onChange={(e) => setValues({ ...values, studio: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Type</label>
            <select
              name="selectedType"
              value={values.type}
              onChange={(e) => setValues({ ...values, type: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="TV">TV</option>
              <option value="Movie">Movie</option>
              <option value="OVA">OVA</option>
              <option value="ONA">ONA</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="">Synopsis</label>
            <input
              type="text"
              placeholder="Enter Synopsis"
              className="form-control"
              value={values.synopsis}
              onChange={(e) =>
                setValues({ ...values, synopsis: e.target.value })
              }
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Thumbnail Art</label>
            <input
              type="text"
              placeholder="Enter a link to thumbnail art"
              className="form-control"
              value={values.image}
              onChange={(e) => setValues({ ...values, image: e.target.value })}
            />
            <img src={values.image}></img>
          </div>
          <div className="mb-2">
            <label htmlFor="">Status</label>
            <select
              name="selectedStatus"
              onChange={(e) => setValues({ ...values, status: e.target.value })}
            >
              <option value="">Select status</option>
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="On-Hold">On-Hold</option>
              <option value="Dropped">Dropped</option>
              <option value="Plan to Watch">Plan to Watch</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="">Score</label>
            <select
              name="selectedScore"
              onChange={(e) => setValues({ ...values, score: e.target.value })}
            >
              <option value="">Select Score</option>
              <option value="10">10 Masterpiece</option>
              <option value="9">9 Great</option>
              <option value="8">8 Very Good</option>
              <option value="7">7 Good</option>
              <option value="6">6 Fine</option>
              <option value="5">5 Average</option>
              <option value="4">4 Bad</option>
              <option value="3">3 Very Bad</option>
              <option value="2">2 Horrible</option>
              <option value="1">1 Appalling </option>
            </select>
          </div>
          <button className="btn btn-success"> Submit</button>
          <Link to="/animeList" className="btn btn-success">
            {" "}
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CreateAnime;
