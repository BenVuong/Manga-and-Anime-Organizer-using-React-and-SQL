import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
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
    <div>
      <div>
        <form onSubmit={handleUpdate}>
          <h2>Update Manga</h2>
          <div className="mb-2">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="form-control"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Amount collected</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="form-control"
              value={values.amountCollected}
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
              value={values.volAmount}
              onChange={(e) =>
                setValues({ ...values, volAmount: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Publisher</label>
            <input
              type="text"
              placeholder="Enter Publisher"
              className="form-control"
              value={values.publisher}
              onChange={(e) =>
                setValues({ ...values, publisher: e.target.value })
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
            <label htmlFor="">Enter Synopsis</label>
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
              placeholder="Enter link to thumbnail art"
              className="form-control"
              value={values.image}
              onChange={(e) => setValues({ ...values, image: e.target.value })}
            />
            <img src={values.image}></img>
          </div>

          <button className="btn btn-success"> Update</button>
          <Link to="/" className="btn btn-success">
            {" "}
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Edit;
