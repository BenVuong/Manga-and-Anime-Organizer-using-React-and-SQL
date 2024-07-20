import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export function MangaListDisplay({
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
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Collection Progress</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((book, index) => {
            return (
              <tr key={index}>
                <td> {book.name}</td>
                <td>
                  {" "}
                  {book.amountCollected}/{book.volAmount}
                </td>
                <td>
                  <Link
                    className="btn btn-info "
                    role="button"
                    to={`/read/${book.id}`}
                  >
                    Details
                  </Link>
                  <Link
                    className="btn btn-success "
                    role="button"
                    to={`/edit/${book.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleOpen(book.name, book.id)}
                    className="btn btn-danger"
                  >
                    {" "}
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
                        Are you sure you want to delete {mangaName} from your
                        list?
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{
                          mt: 2,
                        }}
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
