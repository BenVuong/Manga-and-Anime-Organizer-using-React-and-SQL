import { AnimeListDisplay } from "./animeListDisplay";
import { AnimeListCards } from "./animeListCards";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

function AnimeList() {
  const [data, setData] = useState([]);
  const [animeName, setAnimeName] = useState("");
  const [arrayOfAnime, setArrayOfAnime] = useState([]);
  const [animeID, setAnimeID] = useState();
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState("Cards");
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
        console.log(sortedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterStatus = (event) => {
    switch (event.target.value) {
      case "Completed":
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

  const filterType = (event) => {
    switch (event.target.value) {
      case "TV":
        setArrayOfAnime(data.filter((data) => data.type === "TV"));
        break;
      case "Movie":
        setArrayOfAnime(data.filter((data) => data.type === "Movie"));
        break;
      case "OVA":
        setArrayOfAnime(data.filter((data) => data.type === "OVA"));
        break;
      case "ONA":
        setArrayOfAnime(data.filter((data) => data.type === "ONA"));
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

  function DisplayLayout() {
    if (layout === "Cards") {
      return (
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
      );
    } else {
      return (
        <AnimeListDisplay
          data={arrayOfAnime}
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          style={style}
          animeName={animeName}
          handleDelete={handleDelete}
          animeID={animeID}
        />
      );
    }
  }

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
        <AccordionSummary>Filter</AccordionSummary>
        <AccordionDetails>
          <div>
            <div>
              <InputLabel>Status</InputLabel>
              <Select label="Status" onChange={filterStatus}>
                <MenuItem value={"all"}>ALL</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"Watching"}>Watching</MenuItem>
                <MenuItem value={"Plan to Watch"}>Plan to Watch</MenuItem>
                <MenuItem value={"On-Hold"}>On-Hold</MenuItem>
                <MenuItem value={"Dropped"}>Dropped</MenuItem>
              </Select>
              <InputLabel>Type</InputLabel>
              <Select onChange={filterType} label="Type">
                <MenuItem value={"all"}>ALL</MenuItem>
                <MenuItem value={"TV"}>TV</MenuItem>
                <MenuItem value={"Movie"}>Movie</MenuItem>
                <MenuItem value={"OVA"}>OVA</MenuItem>
                <MenuItem value={"ONA"}>ONA</MenuItem>
              </Select>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Display Layout</AccordionSummary>
        <AccordionDetails>
          <button onClick={() => setLayout("Cards")}>Cards Layout</button>
          <button onClick={() => setLayout("List")}>List Layout</button>
        </AccordionDetails>
      </Accordion>
      <DisplayLayout />
    </div>
  );
}

export default AnimeList;
