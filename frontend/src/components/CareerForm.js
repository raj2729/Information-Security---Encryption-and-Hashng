import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Box } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@material-ui/core";

// Importing Header
import Header from "./Header";

import axios from "axios";
import { createCourse } from "../actions/courseActions";

const homePageTheme = createTheme({
  palette: {
    primary: {
      main: "#809FFF",
    },
    secondary: {
      main: "#000000",
    },
    text: {
      primary: "#000000",
      secondary: "#FEFFFF",
    },
  },
});

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    display: "block",
  },
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 100%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
});

const CareerForm = ({ history, match }) => {
  const classes = useStyles();
  const [jobType, setjobType] = useState("");
  const [jobTypeError, setjobTypeError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [ySelected, setYSelected] = useState("");
  const [linkedInProfile, setlinkedInProfile] = useState("");
  const [githubProfile, setgithubProfile] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [jobList, setJobList] = useState([]);
  // const [chapterStudyMaterial, setChapterStudyMaterial] = useState("");
  const [nameError, setnameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [ySelectedError, setYSelectedError] = useState("");
  const [linkedInProfileError, setlinkedInProfileError] = useState(false);
  const [resumeLinkError, setResumeLinkError] = useState("");

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success === true) {
      history.push(`/careerForm`);
    }
  }, [success]);

  useEffect(() => {
    console.log(jobList);
  }, [jobList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setnameError(false);
    setMobileNumberError(false);
    setDescriptionError(false);
    setjobTypeError(false);
    setlinkedInProfileError(false);
    setYSelectedError(false);
    setResumeLinkError(false);
    setEmailError(false);

    if (jobType == "") setjobTypeError(true);
    if (name == "") setnameError(true);
    if (mobileNumber == 0) setMobileNumberError(true);
    if (description == "") setDescriptionError(true);
    if (ySelected == "") setYSelectedError(true);
    if (linkedInProfile == "") setlinkedInProfileError(true);
    if (resumeLink == "") setResumeLinkError(true);
    if (email == "") setEmailError(true);
  };

  const careerSubmitHandler = async () => {
    // console.log("hello");
    // console.log(match.params.id);
    // const formData = new FormData();
    // formData.append("file", chapterVideoLink);
    // formData.append("upload_preset", "ude8cxll");

    // await axios
    //       .post("https://api.cloudinary.com/v1_1/dizvyn9b5/video/upload", formData)
    //       .then((response) => {
    //         console.log(response.data.secure_url);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // courseId: match.params.id,
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        jobType: jobType,
        description: description,
        ySelected: ySelected,
        linkedInProfile: linkedInProfile,
        githubProfile: githubProfile,
        resumeLink: resumeLink,
        jobList: jobList,
      }),
    };
    // setPublicIdd(response.data.secure_url);
    fetch(`http://localhost:8080/career/careerForm`, requestOptions)
      .then((response) => {
        // console.log(response);
        response.json();
      })
      .then((response) => {
        console.log(response);
      });
    alert("You will be contacted sortly if you are shortlisted");
    setSuccess(true);
  };

  const jobsList = [
    { jobName: "Backend Developer" },
    { jobName: "Frontend Developer" },
    { jobName: "UI/UX Developer" },
    { jobName: "Sales and Marketing" },
    { jobName: "Content Writing" },
  ];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobList(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <ThemeProvider theme={homePageTheme}>
        <Header />
      </ThemeProvider>
      <Container>
        <Box m={2} pt={9} />
        <Typography
          variant="h5"
          gutterBottom
          color="textPrimaryary"
          marginTop="20"
          align="center"
          component="h2"
        >
          Career Opportunities{" "}
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Job Type</FormLabel>
            <RadioGroup
              row
              aria-label="jobType"
              name="row-radio-buttons-group"
              onChange={(event) => setjobType(event.target.value)}
              error={jobTypeError}
            >
              <FormControlLabel
                value="internship"
                control={<Radio />}
                label="Internship"
              />
              <FormControlLabel value="job" control={<Radio />} label="Job" />
            </RadioGroup>
          </FormControl>
          <TextField
            onChange={(e) => setName(e.target.value)}
            className={classes.field}
            label="Full Name"
            variant="outlined"
            colour="secondary"
            fullWidth
            required
            error={nameError}
          />
          <TextField
            onChange={(e) => setMobileNumber(e.target.value)}
            className={classes.field}
            label="Mobile Number"
            variant="outlined"
            colour="secondary"
            fullWidth
            required
            error={mobileNumberError}
          />
          <TextField
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className={classes.field}
            label="Email"
            variant="outlined"
            colour="secondary"
            fullWidth
            required
            error={emailError}
          />
          <FormControl sx={{ m: 1, width: 800 }}>
            <InputLabel id="demo-multiple-name-label">
              Select all positions you want to apply for
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              fullWidth
              value={jobList}
              onChange={handleChange}
              input={
                <OutlinedInput label="Select all positions you want to apply for" />
              }
              MenuProps={MenuProps}
            >
              {jobsList.map((name) => (
                <MenuItem
                  key={name.jobName}
                  value={name.jobName}
                  //   style={getStyles(name, personName, theme)}
                >
                  {name.jobName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            onChange={(e) => setDescription(e.target.value)}
            className={classes.field}
            label="Tell us something about yourself"
            variant="outlined"
            colour="secondary"
            multiline
            rows={15}
            fullWidth
            required
            error={descriptionError}
          />
          <TextField
            onChange={(e) => setYSelected(e.target.value)}
            className={classes.field}
            label="Why do you think you should be selected"
            variant="outlined"
            colour="secondary"
            multiline
            rows={15}
            fullWidth
            required
            error={ySelectedError}
          />
          <TextField
            onChange={(e) => setlinkedInProfile(e.target.value)}
            className={classes.field}
            label="LinkedIn Profile"
            variant="outlined"
            colour="secondary"
            fullWidth
            required
            error={linkedInProfileError}
          />
          <TextField
            onChange={(e) => setgithubProfile(e.target.value)}
            className={classes.field}
            label="Github Profile"
            variant="outlined"
            colour="secondary"
            fullWidth
          />
          <TextField
            onChange={(e) => setResumeLink(e.target.value)}
            className={classes.field}
            label="Resume Link"
            variant="outlined"
            colour="secondary"
            required
            fullWidth
            error={resumeLinkError}
          />
          <Button
            type="submit"
            size="large"
            classes={{
              root: classes.root,
              label: classes.label,
            }}
            style={{ marginBottom: "100px" }}
            startIcon={<AddCircleIcon />}
            onClick={careerSubmitHandler}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CareerForm;
