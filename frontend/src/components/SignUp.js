import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/userActions";

import { createTheme, ThemeProvider } from "@material-ui/core";

// Importing Header, Footer and Copyright
import Header from "./Header";

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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://elearningindustry.com/wp-content/uploads/2019/07/top-6-eLearning-trends-of-2019.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // height: "100%",
    // width: "40%",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "60%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp({ history }) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userRegisterInfo } = userRegister;

  useEffect(() => {
    if (userRegisterInfo) {
      history.push("/signin");
    }
  }, [userRegisterInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   setMessage("Passwords do not match");
    // } else {
    //   //dispatch
    //   dispatch(register(name, email, password));
    // }
    dispatch(register(name, email, password));
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid item>
                Already a user?&nbsp;
                <Link to={"/signin"}>Login</Link>
                {/* <Link href="#" variant="body2">
                  
                </Link> */}
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default SignUp;
