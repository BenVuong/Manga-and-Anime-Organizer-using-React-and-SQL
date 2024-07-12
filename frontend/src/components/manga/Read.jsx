import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../../App.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const Title = styled("div")(({ theme }) => ({
  backgroundColor: "#616161",
  border: "1px solid",
  color: "#fff",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "left",
  fontSize: "30px",
}));

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",

  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "left",
}));

const Pillar = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "left",
}));

function Read() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [checkList, setCheckBoxList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => {
        console.log(res);
        setBook(res.data[0]);
        setCheckBoxList(JSON.parse(res.data[0].list));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid xs={12}>
          <Title>{book.name}</Title>
        </Grid>
        <Grid xs={12} sm={2}>
          <Pillar>
            <Item>
              <img src={book.image} style={{ maxWidth: "100%" }} />
              <Item> Information:</Item>
              <Divider />
              <Item>Volumes: {book.volAmount}</Item>
              <Item>Story by: {book.story}</Item>
              <Item>Art by: {book.art}</Item>
              <Item>Publisher: {book.publisher}</Item>
            </Item>

            <Item>
              <Link to="/" className="btn btn-success">
                {" "}
                Back
              </Link>
              <Link
                className="btn btn-outline-dark "
                role="button"
                to={`/edit/${book.id}`}
              >
                Edit
              </Link>
            </Item>
          </Pillar>
        </Grid>
        <Grid xs={12} sm={10}>
          <Item>Score: {book.score}</Item>
          <Item>Volumes Collected: {book.amountCollected}</Item>
          <Item>Status: {book.status}</Item>
          <Item>
            Synopsis:
            <Divider />
            {book.synopsis}
          </Item>
          <Item>
            Notes:
            <Divider />
            {book.notes}
          </Item>
          <h2>Individual Volumes Collected</h2>
          <div>
            {checkList?.map((isChecked, index) => (
              <div key={index}>
                <input type="checkbox" checked={isChecked}></input>
                <label>Volume {index + 1}</label>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Read;
