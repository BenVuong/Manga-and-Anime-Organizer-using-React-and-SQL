import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/deletebook/" + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Manga Collection</h1>
      <div className="d-flex justify-content  ">
        <Link to="/animeList" className="btn btn-success">
          {" "}
          Anime List{" "}
        </Link>
      </div>
      <div className="d-flex justify-content  ">
        <Link to="/create" className="btn btn-success">
          {" "}
          Add Manga +
        </Link>
      </div>
      <div className="p-3 mb-2 bg-secondary text-white">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Collection Progress</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book, index) => {
              return (
                <tr key={index}>
                  <td> {book.name}</td>
                  <td>
                    {" "}
                    {book.amountCollected}/{book.volAmount}
                  </td>
                  <td>
                    <Link
                      className="btn btn-info "
                      role="button"
                      to={`/read/${book.id}`}
                    >
                      Details
                    </Link>
                    <Link
                      className="btn btn-success "
                      role="button"
                      to={`/edit/${book.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="btn btn-danger"
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
