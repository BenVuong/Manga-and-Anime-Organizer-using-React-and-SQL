import { AnimeListDisplay } from "./animeListDisplay";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Modal,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
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
      .then(console.log(data))
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
      <Accordion>
        <AccordionSummary>Filter by status</AccordionSummary>
        <AccordionDetails>
          <button>Completed</button>
        </AccordionDetails>
      </Accordion>
      <AnimeListDisplay
        data={data}
        handleOpen={handleOpen}
        open={open}
        handleClose={handleClose}
        style={style}
        animeName={animeName}
        handleDelete={handleDelete}
        animeID={animeID}
      />
    </div>
  );
}

export default AnimeList;
