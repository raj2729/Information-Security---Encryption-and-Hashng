import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// import "../App.css";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Importing Header
import Header from "./Header";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
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

function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // const [nameError, setNameError] = useState("");
  // const [numberError, setNumberError] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [descriptionError, setDescriptionError] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //  setDescriptionError(false);
  //  setEmailError(false);
  //  setNameError(false);
  //  setNumberError(false);

  //   if (name == "") setNameError(true);
  //   if (email == "") setEmailError(true);
  //   if (number == "") setNumberError(true);
  //   if(description=="") setDescriptionError(true);
  // };

  const contacFormSubmitHandler = async () => {
    // Regex to check if a string
    // contains uppercase, lowercase
    // special character & numeric value
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    if (number.length !== 10) {
      alert("The length of Mobile Number should be 10");
    } else if (email.includes("@") === false || email.includes(".") === false) {
      alert("Enter a valid Email ID");
    } else if (password.length <= 12 || pattern.test(password) === false) {
      alert(
        "Enter a valid Password. The length of Password should be minimum 12 characters and the password must contain 1 Uppercase Character, 1 Lowercase Character, 1 Numeric Character and 1 Special Character"
      );
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // courseId: match.params.id,
          name: name,
          email: email,
          number: Number(number),
          password: password,
          address: address,
        }),
      };
      fetch(`http://localhost:8080/user/userRegister`, requestOptions)
        .then((response) => {
          console.log(response);
          response.json();
        })
        .then((response) => {
          console.log(response);
        });
      // alert("Query sent successfully");
      // const config = { headers: { "Content-Type": "application/json" } };
      // const { data } = await axios.post(
      //   "/user/userRegister",
      //   { name, email, number, password, address },
      //   config
      // );
      // if (data.success) {
      //   alert("Success");
      // } else {
      //   alert("Failure");
      // }
      // console.log(data);
      Swal.fire(
        "User Registration is successful",
        `Username: ${name}`,
        "success"
      );
    }
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: "50px" }}></div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ margin: "80px 0px 10px" }}
      >
        <Card
          style={{
            maxWidth: 450,
            padding: "5px",
            margin: "0 auto",
            boxShadow: "5px 5px 5px 5px lightgrey",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
              User Register
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} item style={{ paddingTop: "30px" }}>
                  <TextField
                    placeholder="Enter Username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setName(event.target.value)}
                    // error={nameError}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "30px" }}>
                  <TextField
                    // type="email"
                    placeholder="Enter Address"
                    label="Enter Address"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setAddress(event.target.value)}
                    // error={emailError}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "30px" }}>
                  <TextField
                    // type="number"
                    placeholder="Enter mobile number"
                    label="Enter Mobile Number"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setNumber(event.target.value)}
                    // error={numberError}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "30px" }}>
                  <TextField
                    // type="description"
                    label="Enter Email ID"
                    multiline
                    // rows={6}
                    placeholder="Enter Email ID"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    // error={descriptionError}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "30px" }}>
                  <TextField
                    // type="description"
                    label="Enter Password"
                    multiline
                    // rows={6}
                    placeholder="Enter Password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setPassword(event.target.value)}
                    // error={descriptionError}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "30px" }}>
                  <Button
                    type="submit"
                    size="large"
                    classes={{
                      root: classes.root,
                      label: classes.label,
                    }}
                    fullWidth
                    onClick={contacFormSubmitHandler}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default SignUp;
