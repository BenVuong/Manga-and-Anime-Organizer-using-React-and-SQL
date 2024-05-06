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
        <form onSubmit={handleSubmit}>
          <h2>Add Manga</h2>
          <div className="mb-2">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="form-control"
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
              onChange={(e) => setValues({ ...values, story: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Art by</label>
            <input
              type="text"
              placeholder="Art by"
              className="form-control"
              onChange={(e) => setValues({ ...values, art: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Synopsis</label>
            <input
              type="text"
              placeholder="Enter Synposis"
              className="form-control"
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
