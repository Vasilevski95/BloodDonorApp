import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFieldValues = {
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  bloodGroup: "",
  address: "",
};

const DonorCandidateForm = ({
  currentId,
  setCurrentId,
  fetchAllDCandidates,
  candidates,
  baseUrl,
}) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName =
        fieldValues.fullName !== "" ? "" : "This field is required";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile !== "" ? "" : "This field is required";
    if ("bloodGroup" in fieldValues)
      temp.bloodGroup =
        fieldValues.bloodGroup !== "" ? "" : "This field is required";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+.+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const handleCreateDonor = async (data) => {
    return await axios.post(baseUrl, data);
  };

  const handleUpdateDonor = async (id, data) => {
    return await axios.put(`${baseUrl}${id}`, data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formattedData = { ...values, age: parseInt(values.age || "0") };

      if (currentId === 0) {
        try {
          await handleCreateDonor(formattedData);
          toast.success("Created successfully!");
        } catch {
          toast.error("Submission failed! Please try again.");
        }
      } else {
        try {
          await handleUpdateDonor(currentId, formattedData);
          toast.success("Updated successfully!");
        } catch {
          toast.error("Submission failed! Please try again.");
        }
      }
      fetchAllDCandidates();
      handleResetForm();
    }
  };

  const handleResetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
    setCurrentId(0);
  };

  useEffect(() => {
    if (currentId !== 0) {
      const candidate = candidates.find((x) => x.id === currentId);
      if (candidate) setValues(candidate);
    }
  }, [currentId, candidates]);

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      className="rootform"
    >
      <Typography
        sx={{ padding: "0.5rem", fontWeight: "bold", fontSize: "2rem" }}
      >
        Add a donor
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="fullName"
            variant="outlined"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            {...(errors.mobile && {
              error: true,
              helperText: errors.mobile,
            })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && {
              error: true,
              helperText: errors.email,
            })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="age"
            variant="outlined"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.bloodGroup}>
            <InputLabel>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleInputChange}
              label="Blood Group"
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginRight: "0.5rem" }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "lightgray",
              color: "black",
            }}
            onClick={handleResetForm}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DonorCandidateForm;
