import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Grid, Card, InputLabel, TextField, CardContent } from "@mui/material";
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
    <Grid container justify="center">
      <Grid item md={3}>
        <Card alignItems="center" justifyContent="center">
          <CardContent>
            <Grid item container alignItems="center" justifyContent="center">
              <Grid item>
                <h2>Add Anime</h2>
              </Grid>
              <Grid item>
                <form onSubmit={handleSearchSubmit}>
                  <div className="mb-2">
                    <TextField
                      id="outlined-basic"
                      label="Enter in title of an anime"
                      onChange={(e) => setSearchAnimeName(e.target.value)}
                      helperText="Once entered its info will be automatically filled out"
                    ></TextField>
                  </div>
                  <button className="btn btn-success"> Search Anime</button>
                  <h3>Cover Art Preview:</h3>
                  <img src={values.image} style={{ maxWidth: "100%" }}></img>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={9}>
        <Card>
          <CardContent>
            <Grid item container>
              <form onSubmit={handleSubmit}>
                <h2>Anime Info</h2>
                <h5>You can manually edit these entries if needed</h5>
                <button className="btn btn-success"> Submit</button>
                <Link to="/animeList" className="btn btn-success">
                  {" "}
                  Back
                </Link>
                <h2></h2>
                <Grid item md={25}>
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{ shrink: true }}
                    value={values.title}
                    label="Title"
                    onChange={(e) =>
                      setValues({ ...values, title: e.target.value })
                    }
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    label="Studio"
                    InputLabelProps={{ shrink: true }}
                    value={values.studio}
                    onChange={(e) =>
                      setValues({ ...values, studio: e.target.value })
                    }
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    label="Episodes Watched"
                    onChange={(e) =>
                      setValues({ ...values, episodesWatched: e.target.value })
                    }
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={values.episodeCount}
                    label="Episode Count"
                    onChange={(e) =>
                      setValues({ ...values, episodeCount: e.target.value })
                    }
                  ></TextField>
                </Grid>
                <h2></h2>
                <Grid item md={20}>
                  <InputLabel>Type</InputLabel>
                  <select
                    name="selectedType"
                    value={values.type}
                    onChange={(e) =>
                      setValues({ ...values, type: e.target.value })
                    }
                  >
                    <option value="">Select type</option>
                    <option value="TV">TV</option>
                    <option value="Movie">Movie</option>
                    <option value="OVA">OVA</option>
                    <option value="ONA">ONA</option>
                  </select>
                  <InputLabel>Score</InputLabel>
                  <select
                    name="selectedScore"
                    onChange={(e) =>
                      setValues({ ...values, score: e.target.value })
                    }
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
                  <InputLabel>Status</InputLabel>
                  <select
                    name="selectedStatus"
                    onChange={(e) =>
                      setValues({ ...values, status: e.target.value })
                    }
                  >
                    <option value="">Select status</option>
                    <option value="Watching">Watching</option>
                    <option value="Completed">Completed</option>
                    <option value="On-Hold">On-Hold</option>
                    <option value="Dropped">Dropped</option>
                    <option value="Plan to Watch">Plan to Watch</option>
                  </select>
                </Grid>
                <h2></h2>
                <Grid item md={20}>
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={values.image}
                    label="Link to Thumbnail art"
                    onChange={(e) =>
                      setValues({ ...values, image: e.target.value })
                    }
                  ></TextField>
                  <h2></h2>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={values.synopsis}
                    label="Synopsis"
                    onChange={(e) =>
                      setValues({ ...values, synopsis: e.target.value })
                    }
                  ></TextField>
                </Grid>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CreateAnime;
