import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Grid, Card, TextField, CardContent } from "@mui/material";
function Edit() {
  const { id } = useParams();

  const [values, setValues] = useState({
    name: "",
    amountCollected: "",
    volAmount: "",
    publisher: "",
    story: "",
    art: "",
    synopsis: "",
  });
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/edit/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/read/" + id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          name: res.data[0].name,
          amountCollected: res.data[0].amountCollected,
          volAmount: res.data[0].volAmount,
          publisher: res.data[0].publisher,
          story: res.data[0].story,
          art: res.data[0].art,
          synopsis: res.data[0].synopsis,
          image: res.data[0].image,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Grid container justify="center">
      <Grid item md={3}>
        <Card alignItems="center" justifyContent="center">
          <CardContent>
            <Grid item container alignItems="center" justifyContent="center">
              <Grid item>
                <h2>Edit Manga</h2>
                <h3>Cover Art Preview:</h3>
                <img src={values.image}></img>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={9}>
        <Card>
          <CardContent>
            <Grid item container>
              <form onSubmit={handleUpdate}>
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
                    value={values.name}
                    label="Title"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
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
                    value={values.publisher}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      setValues({ ...values, publisher: e.target.value })
                    }
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={values.amountCollected}
                    label="Volumes Collected"
                    onChange={(e) =>
                      setValues({ ...values, amountCollected: e.target.value })
                    }
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={values.volAmount}
                    label="Total Volume Count"
                    onChange={(e) =>
                      setValues({ ...values, volAmount: e.target.value })
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

export default Edit;
