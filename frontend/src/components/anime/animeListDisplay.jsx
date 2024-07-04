import React from "react";
import { Link } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
export function AnimeListDisplay({
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
      {data?.map((anime, index) => {
        return (
          <tr key={index}>
            <td> {anime.title}</td>
            <td>
              {" "}
              {anime.episodesWatched}/{anime.episodeCount}
            </td>
            <td>
              <Link
                className="btn btn-info "
                role="button"
                to={`/readanime/${anime.id}`}
              >
                Details
              </Link>
              <Link
                className="btn btn-success  "
                role="button"
                to={`/editanime/${anime.id}`}
              >
                Edit
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
                    Are you sure you want to delete {animeName} from your list?
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    sx={{
                      mt: 2,
                    }}
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
            </td>
          </tr>
        );
      })}
    </div>
  );
}
