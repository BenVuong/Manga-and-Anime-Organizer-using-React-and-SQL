import React, { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Card,
  TextField,
  CardContent,
  InputLabel,
  Divider,
} from "@mui/material";

const debounce = (func, delay) => {
  let timeOutID;
  const debouncedFunction = (...args) => {
    if (timeOutID) {
      clearTimeout(timeOutID);
    }
    timeOutID = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    if (timeOutID) {
      clearTimeout(timeOutID);
    }
  };
  return debouncedFunction;
};

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
    score: "",
    status: "",
    notes: "",
  });
  const navigate = useNavigate();
  const [listOfManga, setListOfManga] = useState([]);
  const API_URL = "https://api.jikan.moe/v4";

  const searchManga = async (search) => {
    if (search.length === 0) {
      setListOfManga([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/manga?q=${search}`);
      const mangaData = await response.json();
      console.log(mangaData.data);
      setListOfManga(mangaData.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function getMangaInfo(id) {
    const response = await fetch(`${API_URL}/manga/${id}`);
    const mangaData = await response.json();
    console.log(mangaData.data);
    setValues({
      ...values,
      title: mangaData.data.title_english,
      totalVolumes: mangaData.data.volumes,
      story: mangaData.data.authors[0].name,
      art: mangaData.data.authors[0].name,
      synopsis: mangaData.data.synopsis,
      image: mangaData.data.images.jpg.image_url,
    });
  }

  const debounceSearch = useCallback(debounce(searchManga, 300), []);

  const handleChange = (e) => {
    const { value } = e.target;
    debounceSearch(value);
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
    <Grid container justify="center">
      <Grid item md={3}>
        <Card alignItems="center" justifyContent="center">
          <CardContent>
            <Grid item container alignItems="center" justifyContent="center">
              <Grid item>
                <h2>Add Manga</h2>
              </Grid>
              <Grid item>
                <div className="mb-2">
                  <TextField
                    id="outlined-basic"
                    label="Enter in title of manga"
                    onChange={handleChange}
                    helperText="Enter in a title to get a list of resulting searches"
                  ></TextField>
                </div>
                <Divider />
                <Grid container style={{ height: "750px", overflowY: "auto" }}>
                  {listOfManga?.map((manga) => {
                    return (
                      <div>
                        <Grid item>
                          {""}
                          <img src={manga.images.jpg.image_url}></img>
                        </Grid>
                        <Grid item>
                          <button
                            onClick={() => getMangaInfo(manga.mal_id)}
                            value={manga.mal_id}
                          >
                            {manga.title_english
                              ? manga.title_english
                              : manga.title}
                          </button>
                        </Grid>
                      </div>
                    );
                  })}
                </Grid>
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
                <h2>Manga Info</h2>
                <h5>You can manually edit these entries if needed</h5>
                <button className="btn btn-success"> Submit</button>
                <Link to="/" className="btn btn-success">
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
                    label="Story by"
                    value={values.story}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      setValues({ ...values, story: e.target.value })
                    }
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{ shrink: true }}
                    value={values.art}
                    label="Art by"
                    onChange={(e) =>
                      setValues({ ...values, art: e.target.value })
                    }
                  ></TextField>
                  <h2></h2>
                  <TextField
                    id="outlined-basic"
                    label="Publisher"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      setValues({ ...values, mangaPublisher: e.target.value })
                    }
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    label="Volumes Collected"
                    onChange={(e) =>
                      setValues({ ...values, amountCollected: e.target.value })
                    }
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={values.totalVolumes}
                    label="Total Volume Count"
                    onChange={(e) =>
                      setValues({ ...values, totalVolumes: e.target.value })
                    }
                  ></TextField>
                </Grid>
                <h2>
                  <img src={values.image} style={{ maxWidth: "100%" }}></img>
                </h2>
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
                    <option value="Reading">Reading</option>
                    <option value="Completed">Completed</option>
                    <option value="On-Hold">On-Hold</option>
                    <option value="Dropped">Dropped</option>
                    <option value="Plan to Read">Plan to Read</option>
                  </select>
                  <h2></h2>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Notes"
                    onChange={(e) =>
                      setValues({ ...values, notes: e.target.value })
                    }
                  ></TextField>
                  {/* Feature addition idea 
                      have each manga volume be its own check box 
                      check can be independently checked out to show
                      that the user has collected
                      Would work better for a user who is collecting manga out of order
                      currently the notes sections has been made as a placeholder for this feature */}
                </Grid>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Create;
