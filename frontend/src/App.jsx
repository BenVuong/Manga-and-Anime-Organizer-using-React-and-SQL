import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/manga/Home";
import Create from "./components/manga/Create";
import Read from "./components/manga/Read";
import Edit from "./components/manga/Edit";
import AnimeList from "./components/anime/animeList";
import AnimeDetails from "./components/anime/animeDetails";
import CreateAnime from "./components/anime/CreateAnime";
import EditAnime from "./components/anime/EditAnime";

import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/animeList" element={<AnimeList />} />
        <Route path="/animeDetails" element={<AnimeDetails />} />
        <Route path="/createanime" element={<CreateAnime />} />
        <Route path="/editanime/:id" element={<EditAnime />} />
        <Route path="/readanime/:id" element={<AnimeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
