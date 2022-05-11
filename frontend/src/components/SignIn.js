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

function SignIn() {
  const classes = useStyles();
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [number, setNumber] = useState("");
  // const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const contacFormSubmitHandler = async () => {
    if (email.includes("@") === false || email.includes(".") === false) {
      alert("Enter a valid Email ID");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      };
      await fetch(`http://localhost:8080/user/userLogin`, requestOptions)
        .then((response) => {
          console.log(response);
          alert(response);
          response.json();
        })
        .then((response) => {
          alert(response);
          if (response.success) {
            Swal.fire("User Login is successful", `Success`, "success");
          } else {
            Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
          }
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
      await sleep(5000);
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
              User Login
            </Typography>
            <form>
              <Grid container spacing={1}>
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

export default SignIn;
