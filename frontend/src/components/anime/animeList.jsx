import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
function AnimeList() {
  const [data, setData] = useState([]);
  const [animeName, setAnimeName] = useState("");
  const [animeID, setAnimeID] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (showName, showID) => {
    setAnimeID(showID);
    setAnimeName(showName);
    setOpen(true);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8081/animelist")
      .then((res) => setData(res.data))
      .then(console.log(data[1]))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/deleteanime/" + id)
      .then((res) => {
        setOpen(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <h1>Anime Collection and Tracker</h1>
      <div className="d-flex justify-content  ">
        <Link to="/" className="btn btn-success">
          {" "}
          Manga List{" "}
        </Link>
      </div>
      <div className="d-flex justify-content  ">
        <Link to="/createanime" className="btn btn-success">
          {" "}
          Add Anime +
        </Link>
      </div>

      <div className="p-3 mb-2 bg-secondary text-white">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Watch Progress</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((anime, index) => {
              return (
                <tr key={index}>
                  <td> {anime.title}</td>
                  <td>
                    {" "}
                    {anime.episodesWatched}/{anime.episodeCount}
                  </td>
                  <td>
                    <Link
                      className="btn btn-info "
                      role="button"
                      to={`/readanime/${anime.id}`}
                    >
                      Details
                    </Link>
                    <Link
                      className="btn btn-success  "
                      role="button"
                      to={`/editanime/${anime.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleOpen(anime.title, anime.id)}
                      className="btn btn-danger"
                    >
                      {""}
                      Delete
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Are you sure you want to delete {animeName} from your
                          list?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <button
                            onClick={() => handleDelete(animeID)}
                            className="btn btn-danger"
                          >
                            {" "}
                            Yes I am Sure
                          </button>

                          <button
                            onClick={() => window.location.reload()}
                            className="btn btn-success"
                          >
                            {" "}
                            No
                          </button>
                        </Typography>
                      </Box>
                    </Modal>
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

export default AnimeList;
