import { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Grid } from "@mui/material";

import { toast } from "react-toastify";
import "../styles/DonorCandidate.css";
import DonorCandidateForm from "./DonorCandidateForm";
import DonorTable from "./DonorTable";

const baseUrl = import.meta.env.VITE_API_URL;

function DonorCandidate() {
  const [candidates, setCandidates] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  const fetchAllDCandidates = async () => {
    try {
      const response = await axios.get(baseUrl);
      if (response.data) {
        setCandidates(response.data);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("There was an error fetching the candidates!", error);
      toast.error("Error fetching candidates");
    }
  };

  const handleDeleteDonor = async (id) => {
    try {
      await axios.delete(`${baseUrl}${id}`);
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting candidate", error);
      toast.error("Failed to delete candidate");
    }
  };

  useEffect(() => {
    fetchAllDCandidates();
  }, []);

  return (
    <Paper sx={{ margin: 2, padding: 2 }} elevation={3}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <DonorCandidateForm
            currentId={currentId}
            setCurrentId={setCurrentId}
            fetchAllDCandidates={fetchAllDCandidates}
            candidates={candidates}
            baseUrl={baseUrl}
          />
        </Grid>

        <Grid item xs={12}>
          <DonorTable
            candidates={candidates}
            onCurrentId={setCurrentId}
            onDeleteDonor={handleDeleteDonor}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DonorCandidate;
