import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Grid, Card, TextField, CardContent } from "@mui/material";
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
    <Grid container justify="center">
      <Grid item md={3}>
        <Card alignItems="center" justifyContent="center">
          <CardContent>
            <Grid item container alignItems="center" justifyContent="center">
              <Grid item>
                <h2>Add Manga</h2>
              </Grid>
              <Grid item>
                <form onSubmit={handleSearchSubmit}>
                  <div className="mb-2">
                    <TextField
                      id="outlined-basic"
                      label="Enter in title of manga"
                      onChange={(e) => setSearchMangaName(e.target.value)}
                      helperText="Once entered its info will be automatically filled out"
                    ></TextField>
                  </div>
                  <button className="btn btn-success"> Search Manga</button>
                  <h3>Cover Art Preview:</h3>
                  <img src={values.image}></img>
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

export default Create;
