import React from "react";
import {
  Box,
  Modal,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Link } from "react-router-dom";
export function MangaCards({
  data,
  handleOpen,
  open,
  handleClose,
  style,
  mangaName,
  handleDelete,
  mangaID,
}) {
  return (
    <div className="p-3 mb-2 bg-secondary text-white">
      <Grid container spacing={4}>
        {data?.map((manga) => {
          return (
            <Grid item xs={6} sm={3} lg={12 / 5}>
              <Card>
                <Grid container alignContent="center" justifyContent="center">
                  <CardContent>
                    <CardHeader
                      style={{ textAlign: "center" }}
                      title={manga.name}
                      subheader={"Status: " + manga.status}
                    ></CardHeader>
                    <Grid item style={{ textAlign: "center" }}>
                      Score: {manga.score}
                    </Grid>
                    <Typography style={{ textAlign: "center" }}>
                      <img
                        src={manga.image}
                        alt="Cover art"
                        style={{
                          width: "auto",
                          height: "256px",
                          alignContent: "center",
                        }}
                      ></img>
                    </Typography>
                    <Typography style={{ textAlign: "center" }}>
                      Collection Progress: {manga.amountCollected}/
                      {manga.volAmount}
                      <Grid item>
                        <Link
                          className="btn btn-info "
                          role="button"
                          to={`/read/${manga.id}`}
                        >
                          Details
                        </Link>

                        <button
                          onClick={() => handleOpen(manga.name, manga.id)}
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
                              Are you sure you want to delete {mangaName} from
                              your list?
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              <button
                                onClick={() => handleDelete(mangaID)}
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
  );
}
