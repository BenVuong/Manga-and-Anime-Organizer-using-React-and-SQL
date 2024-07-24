import { MangaListDisplay } from "./mangaListDisplay";
import { MangaCards } from "./mangaCards";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <undefined />
        <Link to="/create" className="btn btn-success">
          {" "}
          Add Manga +
        </Link>
      </div>
      <MangaCards
        data={data}
        handleOpen={handleOpen}
        open={open}
        handleClose={handleClose}
        style={style}
        mangaName={mangaName}
        handleDelete={handleDelete}
        mangaID={mangaID}
      />
    </div>
  );
}

export default Home;
