import { ToastContainer } from "react-toastify";
import "./App.css";
import { Container } from "@mui/material";
import DonorCandidate from "./components/DonorCandidate";

function App() {
  return (
    <div>
      <Container maxWidth="lg">
        <DonorCandidate />
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
