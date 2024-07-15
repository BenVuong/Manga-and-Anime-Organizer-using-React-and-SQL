import { AnimeListDisplay } from "./animeListDisplay";
import { AnimeListCards } from "./animeListCards";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

function AnimeList() {
  const [data, setData] = useState([]);
  const [animeName, setAnimeName] = useState("");
  const [arrayOfAnime, setArrayOfAnime] = useState([]);
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
      .then((res) => {
        const sortedData = res.data.sort((a, b) =>
          a.title > b.title ? 1 : -1
        );
        setData(sortedData);
        setArrayOfAnime(sortedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterStatus = (value) => {
    switch (value) {
      case "Complete":
        setArrayOfAnime(data.filter((data) => data.status === "Completed"));
        break;
      case "Watching":
        setArrayOfAnime(data.filter((data) => data.status === "Watching"));
        break;
      case "Plan to Watch":
        setArrayOfAnime(data.filter((data) => data.status === "Plan to Watch"));
        break;
      case "On-Hold":
        setArrayOfAnime(data.filter((data) => data.status === "On-Hold"));
        break;
      case "Dropped":
        setArrayOfAnime(data.filter((data) => data.status === "Dropped"));
        break;
      default:
        setArrayOfAnime(data);
    }
  };

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
          <button onClick={() => filterStatus("clear")}>Reset</button>
          <button onClick={() => filterStatus("Complete")}>Completed</button>
          <button onClick={() => filterStatus("Watching")}>Watching</button>
          <button onClick={() => filterStatus("Plan to Watch")}>
            Plan to Watch
          </button>
          <button onClick={() => filterStatus("On-Hold")}>On-Hold</button>
          <button onClick={() => filterStatus("Dropped")}>Dropped</button>
        </AccordionDetails>
      </Accordion>
      <AnimeListCards
        data={arrayOfAnime}
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
