import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const contacFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (email.includes("@") === false || email.includes(".") === false) {
      alert("Enter a valid Email ID");
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const obj = {
          password: password,
          email: email,
        };

        const resp = await axios.post("/user/userLogin", obj, config);
        console.log(resp.data);
        if (resp.data.success) {
          Swal.fire("User Login is successful", `Yayyyyyyy`, "success");
          setTimeout(() => {
            history.push("/");
          }, 4000);
        } else {
          Swal.fire("User Login not successful", `Try again`, "error");
        }
        console.log("Doneeeeeeeeeeeeee");
      } catch (e) {
        console.log(e);
      }
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
