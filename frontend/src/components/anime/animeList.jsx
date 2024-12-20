import { AnimeListDisplay } from "./animeListDisplay";
import { AnimeListCards } from "./animeListCards";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadJSON from "../downloadJSON";
import DownloadCSV from "../downloadCSV";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Pagination,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { TrackerContext } from "../../helpers/Context";
function AnimeList() {
  const [data, setData] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [animeName, setAnimeName] = useState("");
  const [arrayOfAnime, setArrayOfAnime] = useState([]);
  const [animeID, setAnimeID] = useState();
  const [open, setOpen] = useState(false);
  const {
    animePageNum,
    setAnimePageNum,
    selectedStatus,
    setSelectedStatus,
    selectedtype,
    setSelectedType,
    selectedStudio,
    setSelectedStudio,
    selectedTitle,
    setSelectedTitle,
  } = useContext(TrackerContext);
  const [layout, setLayout] = useState("Cards");

  const handleClose = () => setOpen(false);
  const handleOpen = (showName, showID) => {
    setAnimeID(showID);
    setAnimeName(showName);
    setOpen(true);
  };
  useEffect(() => {
    getAnimeEntriesPages(animePageNum);
  }, [animePageNum]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/animelist")
      .then((res) => {
        setFullList(res.data);
        console.log(fullList);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageChange = (event, value) => {
    setAnimePageNum(value);
  };

  const applyFilter = (event) => {
    event.preventDefault();
    getAnimeEntriesPages(1);
    setAnimePageNum(1);
  };
  const getAnimeEntriesPages = (num) => {
    axios
      .get("http://localhost:8081/paginatedanimelist", {
        params: {
          page: num,
          status: selectedStatus,
          type: selectedtype,
          title: selectedTitle,
          studio: selectedStudio,
        },
      })
      .then((res) => {
        setPageInfo(res.data.paginationInfo);
        console.log(pageInfo);

        setArrayOfAnime(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const filterStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filterType = (event) => {
    setSelectedType(event.target.value);
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

  //TODO Idea: Add a stats and insights page that breaksdown
  //shows percentage of shows watched
  //TODO Idea: add genres to anime and manga mysql tables
  //TODO Idea: Add in CSV/JSON import feature
  //TODO: add and store mal_id to both manga and anime mysql tables
  //This is so we can retrieve more info of each entries using Jikan API
  //rather than storing all of the details in the mysql tables

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
      <h1 className="d-flex justify-content-center">
        Anime Collection and Tracker
      </h1>
      <div className="d-flex justify-content-center ">
        <Link to="/" className="btn btn-success">
          {" "}
          Manga List{" "}
        </Link>
        <Link to="/createanime" className="btn btn-success">
          {" "}
          Add Anime +
        </Link>
      </div>
      total entires: {pageInfo.totalEntries}
      <Accordion>
        <AccordionSummary>Import/Export</AccordionSummary>
        <AccordionDetails>
          <DownloadJSON
            data={fullList}
            fileName={"animelist"}
            label={"Export Anime Collection as JSON"}
          ></DownloadJSON>
          <DownloadCSV
            data={fullList}
            fileName={"animelist"}
            label={"Export Anime Collection as CSV"}
          ></DownloadCSV>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Filter</AccordionSummary>
        <AccordionDetails>
          <form onSubmit={applyFilter}>
            <button className="btn btn-success"> Apply Filter</button>

            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              label="Status"
              onChange={filterStatus}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Watching"}>Watching</MenuItem>
              <MenuItem value={"Plan to Watch"}>Plan to Watch</MenuItem>
              <MenuItem value={"On-Hold"}>On-Hold</MenuItem>
              <MenuItem value={"Dropped"}>Dropped</MenuItem>
            </Select>
            <InputLabel>Type</InputLabel>
            <Select value={selectedtype} onChange={filterType} label="Type">
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"TV"}>TV</MenuItem>
              <MenuItem value={"Movie"}>Movie</MenuItem>
              <MenuItem value={"OVA"}>OVA</MenuItem>
              <MenuItem value={"ONA"}>ONA</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              InputLabelProps={{ shrink: true }}
              label="Title"
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
            ></TextField>
            <TextField
              id="outlined-basic"
              InputLabelProps={{ shrink: true }}
              label="Studio"
              value={selectedStudio}
              onChange={(e) => setSelectedStudio(e.target.value)}
            ></TextField>
          </form>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Display Layout</AccordionSummary>
        <AccordionDetails>
          <Button onClick={() => setLayout("Cards")}>Cards Layout</Button>
          <Button onClick={() => setLayout("List")}>List Layout</Button>
        </AccordionDetails>
      </Accordion>
      <DisplayLayout />
      <div className="d-flex justify-content-center  ">
        <Stack spacing={2}>
          <Typography style={{ textAlign: "center" }}>
            Page: {animePageNum}
          </Typography>
          <Pagination
            count={pageInfo.totalPages}
            page={animePageNum}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
}

export default AnimeList;
