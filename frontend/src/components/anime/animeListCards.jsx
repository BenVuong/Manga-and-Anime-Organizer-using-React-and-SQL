import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Modal,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
export function AnimeListCards({
  data,
  handleOpen,
  open,
  handleClose,
  style,
  animeName,
  handleDelete,
  animeID,
}) {
  return (
    <div>
      <div className="p-3 mb-2 bg-secondary text-white">
        <Grid container spacing={4}>
          {data?.map((anime, index) => {
            return (
              <Grid item xs={6} sm={12 / 3} lg={12 / 5}>
                <Card>
                  <Grid container alignContent="center" justifyContent="center">
                    <CardContent>
                      <CardHeader
                        style={{ textAlign: "center" }}
                        title={anime.title}
                        subheader={"Status: " + anime.status}
                      ></CardHeader>
                      <Grid item style={{ textAlign: "center" }}>
                        Score: {anime.score}
                      </Grid>
                      <Typography style={{ textAlign: "center" }}>
                        <img
                          src={anime.image}
                          alt="Cover art"
                          style={{
                            width: "auto",
                            height: "256px",
                            alignContent: "center",
                          }}
                        ></img>
                      </Typography>
                      <Typography style={{ textAlign: "center" }}>
                        Watch Progress {anime.episodesWatched}/
                        {anime.episodeCount}
                        <Grid item>
                          <Link
                            className="btn btn-info "
                            role="button"
                            to={`/readanime/${anime.id}`}
                          >
                            Details
                          </Link>

                          <button
                            onClick={() => handleOpen(anime.title, anime.id)}
                            className="btn btn-danger"
                          >
                            {""}
                            Delete
                          </button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Are you sure you want to delete {animeName} from
                                your list?
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                <button
                                  onClick={() => handleDelete(animeID)}
                                  className="btn btn-danger"
                                >
                                  {" "}
                                  Yes I am Sure
                                </button>

                                <button
                                  onClick={() => window.location.reload()}
                                  className="btn btn-success"
                                >
                                  {" "}
                                  No
                                </button>
                              </Typography>
                            </Box>
                          </Modal>
                        </Grid>
                      </Typography>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
