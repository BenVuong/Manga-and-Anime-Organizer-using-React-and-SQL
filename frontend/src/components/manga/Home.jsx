import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Modal, Typography, alpha } from "@mui/material";
function Home() {
  const [data, setData] = useState([]);
  const [mangaName, setMangaName] = useState("");
  const [mangaID, setMangaID] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (bookName, bookID) => {
    setMangaID(bookID);
    setMangaName(bookName);
    setOpen(true);
  };
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
                      onClick={() => handleOpen(book.name, book.id)}
                      className="btn btn-danger"
                    >
                      {" "}
                      Delete
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
                            Are you sure you want to delete {mangaName} from
                            your list?
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <button
                              onClick={() => handleDelete(mangaID)}
                              className="btn btn-danger"
                            >
                              {" "}
                              Yes I am Sure
                            </button>

                            <button
                              onClick={() => setOpen(false)}
                              className="btn btn-success"
                            >
                              {" "}
                              No
                            </button>
                          </Typography>
                        </Box>
                      </Modal>
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
