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
  Button,
} from "@mui/material";

function AnimeList() {
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [animeName, setAnimeName] = useState("");
  const [arrayOfAnime, setArrayOfAnime] = useState([]);
  const [animeID, setAnimeID] = useState();
  const [open, setOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [layout, setLayout] = useState("Cards");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedtype, setSelectedType] = useState("");
  const handleClose = () => setOpen(false);
  const handleOpen = (showName, showID) => {
    setAnimeID(showID);
    setAnimeName(showName);
    setOpen(true);
  };
  useEffect(() => {
    getAnimeEntriesPages(pageNum);
  }, [pageNum]);

  const handleNextPage = () => {
    if (pageNum < pageInfo.totalPages) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum((prevPageNum) => prevPageNum - 1);
    }
  };

  const applyFilter = (event) => {
    event.preventDefault();
    getAnimeEntriesPages(1);
  };
  const getAnimeEntriesPages = (num) => {
    axios
      .get("http://localhost:8081/paginatedanimelist", {
        params: {
          page: num,
          status: selectedStatus,
          type: selectedtype,
        },
      })
      .then((res) => {
        setPageInfo(res.data.paginationInfo);
        console.log(pageInfo);
        const sortedData = res.data.data.sort((a, b) =>
          a.title > b.title ? 1 : -1
        );

        setData(sortedData);
        setArrayOfAnime(sortedData);
        console.log(sortedData);
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
        <AccordionSummary>Filter</AccordionSummary>
        <AccordionDetails>
          <form onSubmit={applyFilter}>
            <button className="btn btn-success"> Apply Filter</button>
            <InputLabel>Status</InputLabel>
            <Select label="Status" onChange={filterStatus}>
              <MenuItem value={""}>ALL</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Watching"}>Watching</MenuItem>
              <MenuItem value={"Plan to Watch"}>Plan to Watch</MenuItem>
              <MenuItem value={"On-Hold"}>On-Hold</MenuItem>
              <MenuItem value={"Dropped"}>Dropped</MenuItem>
            </Select>
            <InputLabel>Type</InputLabel>
            <Select onChange={filterType} label="Type">
              <MenuItem value={""}>ALL</MenuItem>
              <MenuItem value={"TV"}>TV</MenuItem>
              <MenuItem value={"Movie"}>Movie</MenuItem>
              <MenuItem value={"OVA"}>OVA</MenuItem>
              <MenuItem value={"ONA"}>ONA</MenuItem>
            </Select>
          </form>
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
      <div className="d-flex justify-content-center  ">
        {" "}
        <Button variant="contained" onClick={handlePrevPage}>
          Prev Page
        </Button>
        Page: {pageNum} / {pageInfo.totalPages}
        <Button variant="contained" onClick={handleNextPage}>
          Next Page
        </Button>
      </div>
    </div>
  );
}

export default AnimeList;
