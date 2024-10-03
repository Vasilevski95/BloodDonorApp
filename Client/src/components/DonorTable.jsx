import {
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const DonorTable = ({ candidates, onCurrentId, onDeleteDonor }) => {
  const [open, setOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpen = (candidate) => {
    setSelectedCandidate(candidate);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpenDeleteModal = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = () => {
    onDeleteDonor(selectedCandidate.id);
    handleCloseDeleteModal();
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead className="header">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((record, index) => (
              <TableRow key={index} hover>
                <TableCell>{record.fullName}</TableCell>
                <TableCell>{record.mobile}</TableCell>
                <TableCell>{record.bloodGroup}</TableCell>
                <TableCell align="right">
                  <ButtonGroup variant="outlined" sx={{ gap: 1 }}>
                    <IconButton onClick={() => handleOpen(record)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => onCurrentId(record.id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteModal(record)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, padding: 4, width: 500 }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
          >
            Donor Details
          </Typography>
          {selectedCandidate && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Name:</strong> {selectedCandidate.fullName}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Mobile:</strong> {selectedCandidate.mobile}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Blood Group:</strong> {selectedCandidate.bloodGroup}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Address:</strong> {selectedCandidate.address}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Age:</strong> {selectedCandidate.age}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{ ...style, padding: 4, width: 400 }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseDeleteModal}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
          >
            Confirm Deletion
          </Typography>
          {selectedCandidate && (
            <Typography sx={{ textAlign: "center", mb: 4 }}>
              Are you sure you want to delete {selectedCandidate.fullName}?
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ width: "100px" }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseDeleteModal}
              sx={{ width: "100px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DonorTable;
