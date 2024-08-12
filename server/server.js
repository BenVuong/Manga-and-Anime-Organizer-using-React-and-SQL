import express, { application } from "express";
import mysql from "mysql";
import cors from "cors";
const port = 8081;
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tracker",
});

//sql query to get all entries of from the book table
app.get("/", (req, res) => {
  const sql = "SELECT * FROM book ORDER by name";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});

app.get("/paginatedmangalist", (req,res) =>{
  const limit = 10; // default limit is 10 items per page
  const page = parseInt(req.query.page) || 1; // default page is 1
  const offset = (page - 1) * limit;
  const status = req.query.status;
  const type = req.query.type;

  let countSql = "SELECT COUNT(*) AS total FROM book";
  let dataSql = "SELECT * FROM book";
  let sqlParams = [];
  dataSql += " ORDER BY name LIMIT ? OFFSET ?";
  sqlParams.push(limit, offset);

  // First query to get total count of entries
  db.query(countSql, sqlParams.slice(0, -2), (err, countResult) => {
    if (err) return res.json({ Message: "error inside server" });

    const totalEntries = countResult[0].total;
    const totalPages = Math.ceil(totalEntries / limit);

    // Second query to get paginated entries
    db.query(dataSql, sqlParams, (err, result) => {
      if (err) return res.json({ Message: "error inside server" });

      return res.json({
        data: result,
        paginationInfo: {
          currentPage: page,
          totalPages: totalPages,
          totalEntries: totalEntries,
        },
      });
    });
  });
})

//grab all entries from anime mysql table
app.get("/animelist", (req, res) => {
  const sql = "SELECT * FROM anime";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});

app.get("/paginatedanimelist", (req, res) => {
  const limit = 10; // default limit is 10 items per page
  const page = parseInt(req.query.page) || 1; // default page is 1
  const offset = (page - 1) * limit;
  const status = req.query.status;
  const type = req.query.type;

  let countSql = "SELECT COUNT(*) AS total FROM anime";
  let dataSql = "SELECT * FROM anime";
  let sqlParams = [];

  let conditions = [];

  if (status && status !== "All") { // optional query parameter to filter status 
    conditions.push(`status = ?`);
    sqlParams.push(status);
  }

  if (type && type !== "All") { // optional query parameter to filter type
    conditions.push(`type = ?`);
    sqlParams.push(type);
  }

  if (conditions.length > 0) {
    const whereClause = " WHERE " + conditions.join(" AND ");
    countSql += whereClause;
    dataSql += whereClause;
  }

  dataSql += " ORDER BY title LIMIT ? OFFSET ?";
  sqlParams.push(limit, offset);

  // First query to get total count of entries
  db.query(countSql, sqlParams.slice(0, -2), (err, countResult) => {
    if (err) return res.json({ Message: "error inside server" });

    const totalEntries = countResult[0].total;
    const totalPages = Math.ceil(totalEntries / limit);

    // Second query to get paginated entries
    db.query(dataSql, sqlParams, (err, result) => {
      if (err) return res.json({ Message: "error inside server" });

      return res.json({
        data: result,
        paginationInfo: {
          currentPage: page,
          totalPages: totalPages,
          totalEntries: totalEntries,
        },
      });
    });
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
    "INSERT INTO book (`name`,`amountCollected`,`volAmount`, `publisher`, `story`, `art`, `synopsis`, `image`, `score`, `status`, `notes`) VALUES (?)";
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
    req.body.notes,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
//sql query to insert new entry into the anime table
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
    "UPDATE book SET `name`=?, `amountCollected`=?, `volAmount`=?, `publisher`=?, `story`=?, `art`=?, `synopsis`=?, `image`=?, `score`=?, `status`=?, `notes`=?, `list`=?  WHERE id=?";
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
      req.body.notes,
      req.body.list,
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

app.listen(port, () => {
  console.log("listening, currently running on port: "+(port));
});
