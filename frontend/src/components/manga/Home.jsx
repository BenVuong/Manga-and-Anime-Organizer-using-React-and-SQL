import { MangaListDisplay } from "./mangaListDisplay";
import { MangaCards } from "./mangaCards";
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
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import DownloadJSON from "../downloadJSON";
import DownloadCSV from "../downloadCSV";
function Home() {
  const [data, setData] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [mangaName, setMangaName] = useState("");
  const [mangaID, setMangaID] = useState();
  const [pageInfo, setPageInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState("Cards");
  const handleClose = () => setOpen(false);
  const handleOpen = (bookName, bookID) => {
    setMangaID(bookID);
    setMangaName(bookName);
    setOpen(true);
  };
  useEffect(() => {
    getMangaEntriesPages(pageNum);
  }, [pageNum]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/", {})
      .then((res) => {
        setFullList(res.data);
        console.log(fullList);
      })
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

  const getMangaEntriesPages = (num) => {
    axios
      .get("http://localhost:8081/paginatedmangalist", {
        params: {
          page: num,
        },
      })
      .then((res) => {
        setPageInfo(res.data.paginationInfo);
        console.log(pageInfo);

        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };
  function DisplayLayout() {
    if (layout === "Cards") {
      return (
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
      );
    } else {
      return (
        <MangaListDisplay
          data={data}
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          style={style}
          mangaName={mangaName}
          handleDelete={handleDelete}
          mangaID={mangaID}
        />
      );
    }
  }

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
      <h1 className="d-flex justify-content-center">
        Manga Collection Tracker
      </h1>
      <div className="d-flex justify-content-center  ">
        <Link to="/animeList" className="btn btn-success">
          {" "}
          Anime List{" "}
        </Link>
        <Link to="/create" className="btn btn-success">
          {" "}
          Add Manga +
        </Link>
      </div>
      <Accordion>
        <AccordionSummary>Import/Export</AccordionSummary>
        <AccordionDetails>
          <DownloadJSON
            data={fullList}
            fileName={"mangalist"}
            label={"Export Manga Collection as JSON"}
          ></DownloadJSON>
          <DownloadCSV
            data={fullList}
            fileName={"mangalist"}
            label={"Export Manga Collection as CSV"}
          ></DownloadCSV>
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
        <Stack spacing={2}>
          <Typography style={{ textAlign: "center" }}>
            Page: {pageNum}
          </Typography>
          <Pagination
            count={pageInfo.totalPages}
            page={pageNum}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
}

export default Home;
