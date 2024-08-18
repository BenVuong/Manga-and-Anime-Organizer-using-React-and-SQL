import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/manga/Home";
import Create from "./components/manga/Create";
import Read from "./components/manga/Read";
import Edit from "./components/manga/Edit";
import AnimeList from "./components/anime/animeList";
import AnimeDetails from "./components/anime/animeDetails";
import CreateAnime from "./components/anime/CreateAnime";
import EditAnime from "./components/anime/EditAnime";
import { TrackerContext } from "./helpers/Context";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [animePageNum, setAnimePageNum] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedtype, setSelectedType] = useState("All");
  const [selectedStudio, setSelectedStudio] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  return (
    <BrowserRouter>
      {" "}
      <TrackerContext.Provider
        value={{
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
        }}
      >
        <Routes>
          <Route path="/animeList" element={<AnimeList />} />
          <Route path="/createanime" element={<CreateAnime />} />
          <Route path="/editanime/:id" element={<EditAnime />} />
          <Route path="/readanime/:id" element={<AnimeDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>{" "}
      </TrackerContext.Provider>
    </BrowserRouter>
  );
}

export default App;
