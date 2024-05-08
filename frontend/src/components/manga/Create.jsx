import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function Create() {
  const [values, setValues] = useState({
    title: "",
    amountCollected: "",
    totalVolumes: "",
    mangaPublisher: "",
    story: "",
    art: "",
    synopsis: "",
    image: "",
  });
  const navigate = useNavigate();
  const [searchMangaName, setSearchMangaName] = useState();
  const API_URL = "https://api.jikan.moe/v4";
  async function searchManga(search) {
    const response = await fetch(`${API_URL}/manga?q=${search}`);
    const mangaData = await response.json();
    console.log(mangaData.data[0]);
    setValues({
      ...values,
      title: mangaData.data[0].title_english,
      totalVolumes: mangaData.data[0].volumes,
      story: mangaData.data[0].authors[0].name,
      art: mangaData.data[0].authors[0].name,
      synopsis: mangaData.data[0].synopsis,
      image: mangaData.data[0].images.jpg.image_url,
    });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchMangaName === "") {
    } else {
      searchManga(searchMangaName);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/book", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <h2>Add Manga</h2>
        <form onSubmit={handleSearchSubmit}>
          <div className="mb-2">
            <label htmlFor="">Search Manga Automatically</label>
            <input
              type="text"
              placeholder="Enter title of a manga and its info will be auto filled "
              className="form-control"
              onChange={(e) => setSearchMangaName(e.target.value)}
            ></input>
          </div>
          <button className="btn btn-success"> Search Manga</button>
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
            <label htmlFor="">Amount collected</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, amountCollected: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Total number of volumes</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="form-control"
              value={values.totalVolumes}
              onChange={(e) =>
                setValues({ ...values, totalVolumes: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Publisher</label>
            <input
              type="text"
              placeholder="Enter Publisher"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, mangaPublisher: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Story by</label>
            <input
              type="text"
              placeholder="Story by"
              className="form-control"
              value={values.story}
              onChange={(e) => setValues({ ...values, story: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Art by</label>
            <input
              type="text"
              placeholder="Art by"
              className="form-control"
              value={values.art}
              onChange={(e) => setValues({ ...values, art: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Synopsis</label>
            <input
              type="text"
              placeholder="Enter Synposis"
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
          <button className="btn btn-success"> Submit</button>
          <Link to="/" className="btn btn-success">
            {" "}
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
