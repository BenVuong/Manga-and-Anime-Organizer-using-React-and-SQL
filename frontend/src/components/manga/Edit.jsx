import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Grid,
  Card,
  TextField,
  CardContent,
  InputLabel,
  Checkbox,
} from "@mui/material";

function Edit() {
  const { id } = useParams();

  const [CheckBoxList, setCheckBoxList] = useState([]);
  const [values, setValues] = useState({
    name: "",
    amountCollected: "",
    volAmount: "",
    publisher: "",
    story: "",
    art: "",
    synopsis: "",
    notes: "",
    list: "",
  });
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    // Update the values.list before making the API call
    setValues((prevValues) => ({
      ...prevValues,
      list: JSON.stringify(CheckBoxList),
    }));

    // Make the API call after updating the values.list
    axios
      .put("http://localhost:8081/edit/" + id, {
        ...values,
        list: JSON.stringify(CheckBoxList), // Use the latest CheckBoxList state
      })
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
          score: res.data[0].score,
          status: res.data[0].status,
          notes: res.data[0].notes,
          list: res.data[0].list,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    //add in a part of the if conidition
    //if volAmount has increased as is more than the length of the current checkboxlist
    //then extend the list
    if (values.list === "") {
      setCheckBoxList(new Array(values.volAmount).fill(false));
    } else {
      setCheckBoxList(JSON.parse(values.list));
      if (values.volAmount > CheckBoxList.length) {
        setCheckBoxList((prevCheckBoxList) => [
          ...prevCheckBoxList,
          ...new Array(values.volAmount - prevCheckBoxList.length).fill(false),
        ]);
      } else if (values.volAmount < CheckBoxList.length) {
        let temp = CheckBoxList;
        for (let x = 0; x < CheckBoxList.length - values.volAmount; x++) {
          temp.pop();
        }
        setCheckBoxList(temp);
      }
    }
  }, [values.volAmount, values.list]);

  const handleCheckboxChange = (index) => {
    const updatedCheckBoxList = CheckBoxList.map((item, idx) =>
      idx === index ? !item : item
    );

    setCheckBoxList(updatedCheckBoxList);
    // Use the functional form to ensure the latest CheckBoxList is used
    setValues((prevValues) => ({
      ...prevValues,
      list: JSON.stringify(updatedCheckBoxList),
    }));
  };

  return (
    <Grid container justify="center">
      <Grid item md={3}>
        <Card alignItems="center" justifyContent="center">
          <CardContent>
            <Grid item container alignItems="center" justifyContent="center">
              <Grid item>
                <h2>Edit Manga</h2>
                <h3>Cover Art Preview:</h3>
                <img
                  src={values.image}
                  style={{ maxWidth: "100%" }}
                  alt="Cover Art"
                ></img>
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
                <button className="btn btn-success">Submit</button>
                <Link to="/" className="btn btn-success">
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
                  <InputLabel>Score</InputLabel>
                  <select
                    name="selectedScore"
                    value={values.score}
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
                    <option value="1">1 Appalling</option>
                  </select>
                  <InputLabel>Status</InputLabel>
                  <select
                    name="selectedStatus"
                    value={values.status}
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
                    value={values.notes}
                    label="Notes"
                    onChange={(e) =>
                      setValues({ ...values, notes: e.target.value })
                    }
                  ></TextField>
                  <h2>Individual Volumes Collected</h2>
                  <div>
                    {CheckBoxList.map((isChecked, index) => (
                      <div key={index}>
                        <Checkbox
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(index)}
                        ></Checkbox>
                        <label>Volume {index + 1}</label>
                      </div>
                    ))}
                  </div>
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
