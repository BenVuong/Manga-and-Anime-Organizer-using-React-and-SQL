import express, { application } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "books",
});

//sql query to get entries of from the book table
app.get("/", (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});

app.get("/animelist", (req, res) => {
  const sql = "SELECT * FROM anime";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM book WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});

app.get("/readanime/:id", (req, res) => {
  const sql = "SELECT * FROM anime WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});
//sql query to insert new entry into the book table
app.post("/book", (req, res) => {
  const sql =
    "INSERT INTO book (`name`,`amountCollected`,`volAmount`, `publisher`, `story`, `art`, `synopsis`, `image`, `score`, `status`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.amountCollected,
    req.body.totalVolumes,
    req.body.mangaPublisher,
    req.body.story,
    req.body.art,
    req.body.synopsis,
    req.body.image,
    req.body.score,
    req.body.status,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/anime", (req, res) => {
  const sql =
    "INSERT INTO anime (`title`,`episodesWatched`,`episodeCount`,`score`, `synopsis`, `image`, `type`, `status`, `studio`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.episodesWatched,
    req.body.episodeCount,
    req.body.score,
    req.body.synopsis,
    req.body.image,
    req.body.type,
    req.body.status,
    req.body.studio,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.put("/edit/:id", (req, res) => {
  const sql =
    "UPDATE book SET `name`=?, `amountCollected`=?, `volAmount`=?, `publisher`=?, `story`=?, `art`=?, `synopsis`=?, `image`=?, `score`=?, `status`=?  WHERE id=?";
  const id = req.params.id;
  db.query(
    sql,
    [
      req.body.name,
      req.body.amountCollected,
      req.body.volAmount,
      req.body.publisher,
      req.body.story,
      req.body.art,
      req.body.synopsis,
      req.body.image,
      req.body.score,
      req.body.status,
      id,
    ],
    (err, result) => {
      if (err) return res.json({ Message: "Error inside server" });
      return res.json(result);
    }
  );
});

app.put("/editanime/:id", (req, res) => {
  const sql =
    "UPDATE anime SET `title`=?,`episodesWatched`=? ,`episodeCount`=?, `score`=?, `synopsis`=?, `image`=?, `type`=?, `status`=?, `studio`=? WHERE id=?";
  const id = req.params.id;
  db.query(
    sql,
    [
      req.body.title,
      req.body.episodesWatched,
      req.body.episodeCount,
      req.body.score,
      req.body.synopsis,
      req.body.image,
      req.body.type,
      req.body.status,
      req.body.studio,
      id,
    ],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

app.delete("/deletebook/:id", (req, res) => {
  const sql = "DELETE FROM book WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete("/deleteanime/:id", (req, res) => {
  const sql = "DELETE FROM anime WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("listeing");
});
