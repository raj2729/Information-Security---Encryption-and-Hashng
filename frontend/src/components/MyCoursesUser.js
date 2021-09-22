import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Importing Header
import Header from "./Header";
import { createTheme, ThemeProvider } from "@material-ui/core";
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
  root: {
    display: "flex",
  },
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
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  button: {
    margin: theme.spacing(1),

    justifyContent: "center",
  },
}));

function MyCoursesUser() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  

  const allUserCourses = useSelector((state) => state.allUserCourses);
  const { courses } = allUserCourses;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={homePageTheme}>
        <Header />
      </ThemeProvider>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {courses.data.map((course) => (
          <Card className={classes.card}>
            {/* <CardActionArea> */}
            <CardContent>
              <CardMedia
                className={classes.media}
                image={course.courseId.image}
                title="MERN stack"
              />
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {course.courseId.name}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" component="p">
                {course.courseId.description}
              </Typography>
            </CardContent>
            {/* </CardActionArea> */}
            <CardActions>
              <Link
                to={`/course/${course.courseId._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="large" color="primary">
                  Start Course
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </main>
    </div>
  );
}
export default MyCoursesUser;
