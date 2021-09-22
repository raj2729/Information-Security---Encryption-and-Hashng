import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createTheme, ThemeProvider } from "@material-ui/core";

// Cover photo
import cover from "../assets/Cover.jpg";

// Importing Header, Footer and Copyright
import Header from "./Header";
import Copyright from "./Copyright";
import Footer from "./Footer";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  allInstructorCoursesAction,
  allUserCoursesAction,
  backendCourseListAction,
  databaseCourseListAction,
  designingCourseListAction,
  frontendCourseListAction,
  fullstackCourseListAction,
  otherCourseListAction,
} from "../actions/courseActions";
import { isUserEnrolledReset } from "../actions/userActions";

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: "#FEFFFF",
    padding: theme.spacing(4, 0, 4),
  },
  header: {
    height: "60vh",
    backgroundSize: "cover",
    backgroundPosition: "65% 50%",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${cover})`,
  },
  heroText: {
    margin: "0 10% 0 10%",
    color: "white",
  },
  cardGrid: {
    backgroundColor: "#FEFFFF",
    paddingBottom: theme.spacing(8),
  },
  heading: {
    width: "100%",
    fontSize: 25,
    fontWeight: "1000",
    textDecoration: "underline",
  },
  card: {
    backgroundColor: "#E6E6E6",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    margin: "2%",
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(6),
  },
}));

function Home({ history }) {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const frontendCourses = useSelector((state) => state.frontendCourses);
  const { frontendCourseList } = frontendCourses;
  const backendCourses = useSelector((state) => state.backendCourses);
  const { backendCourseList } = backendCourses;
  const designingCourses = useSelector((state) => state.designingCourses);
  const { designingCourseList } = designingCourses;
  const databaseCourses = useSelector((state) => state.databaseCourses);
  const { databaseCourseList } = databaseCourses;
  const fullstackCourses = useSelector((state) => state.fullstackCourses);
  const { fullstackCourseList } = fullstackCourses;
  const otherCourses = useSelector((state) => state.otherCourses);
  const { otherCourseList } = otherCourses;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) dispatch(allUserCoursesAction(userInfo.data._id));
    dispatch(isUserEnrolledReset());
    if (userInfo) dispatch(allInstructorCoursesAction(userInfo.data._id));
    dispatch(frontendCourseListAction());
    dispatch(backendCourseListAction());
    dispatch(designingCourseListAction());
    dispatch(databaseCourseListAction());
    dispatch(fullstackCourseListAction());
    dispatch(otherCourseListAction());
  }, [dispatch, history]);

  let courses = [
    // { title: "Frontend", data: [1, 2, 3] },
    { title: "Frontend Courses", data: frontendCourseList },
    { title: "Backend Courses", data: backendCourseList },
    { title: "Designing Courses", data: designingCourseList },
    { title: "Database Courses", data: databaseCourseList },
    { title: "Fullstack Courses", data: fullstackCourseList },
    { title: "Other Courses", data: otherCourseList },
  ];

  return (
    <ThemeProvider theme={homePageTheme}>
      <React.Fragment>
        <CssBaseline />
        {/* Header */}
        <Header />
        {/* Header */}
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="xl">
              <Grid container alignItems="center" className={classes.header}>
                <Grid item className={classes.heroText}>
                  <Typography variant="h4" gutterBottom>
                    Learn HTML , CSS , Web Apps & More
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Learn How To Build Websites & Apps Write A Code Or Start A
                    Business
                  </Typography>
                  <Button variant="contained" color="primary">
                    make a tour
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>

          {/* Fetching courses */}
          <Container className={classes.cardGrid} maxWidth="xl">
            {courses.map((course) => (
              <div>
                <br />
                <Typography className={classes.heading} gutterBottom>
                  {course.title}
                </Typography>
                <br />
                <Grid container spacing={4}>
                  {course.data.map((particularCourse, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          // image="https://source.unsplash.com/random"
                          // image="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210203170945/HTML-Tutorials.png"
                          image={particularCourse.image}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {/* Heading */}
                            {particularCourse.name}
                          </Typography>
                          <Typography>
                            {particularCourse.description}
                            {/* This is a media card. You can use this section to
                            describe the content. */}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link
                            to={`/course/${particularCourse._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button variant="contained" color="primary">
                              View Course
                              <ArrowRightAltIcon />
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <br />
              </div>
            ))}
          </Container>
        </main>
        <footer className={classes.footer}>
          {/* Footer */}
          <Footer />
          {/* Copyright */}
          <Copyright />
        </footer>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default Home;
