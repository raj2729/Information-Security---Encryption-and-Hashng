import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import cover from "../assets/cover.jpg";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: "#FEFFFF",
    padding: theme.spacing(10, 0, 4),
  },
  header: {
    height: "85vh",
    backgroundSize: "cover",
    backgroundPosition: "65% 50%",
    backgroundImage: `url(${cover})`,
  },
  heroText: {
    margin: "0 10% 0 10%",
    color: "black",
  },
  cardGrid: {
    backgroundColor: "#FEFFFF",
    paddingBottom: theme.spacing(8),
  },
  heading: {
    width: "100%",
    fontSize: 30,
    fontWeight: "500",
    textDecoration: "underline",
  },
  card: {
    backgroundColor: "white",
    height: "100%",
    boxShadow: "5px 5px 5px 5px lightgrey",
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
}));

function Home({ history }) {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  let frontendCourseList = [
    {
      name: "HTML",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://cdn.lynda.com/course/170427/170427-636923997581008095-16x9.jpg",
    },
    {
      name: "CSS",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://cdn.mos.cms.futurecdn.net/Vp9WvV7YKdH4k8sKRePcE8-970-80.jpg.webp",
    },
    {
      name: "JavaScript",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://cyberhoot.com/wp-content/uploads/2020/07/Free-Courses-to-learn-JavaScript-768x432.jpg",
    },
    {
      name: "ReactJS",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://res.cloudinary.com/practicaldev/image/fetch/s--50wZvNu6--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/1wwdyw5de8avrdkgtz5n.png",
    },
    {
      name: "ElectronJS",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://res.cloudinary.com/practicaldev/image/fetch/s--dEmfE1jO--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/s3uitx6rdv7sod1g2acz.png",
    },
    {
      name: "AngularJS",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://nareshit.com/wp-content/uploads/2018/08/angular-JS-online-training-nareshit.jpg",
    },
  ];

  let backendCourseList = [
    {
      name: "NodeJS",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js-1024x538.png",
    },
    {
      name: "Django",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image: "https://www.edgica.com/wp-content/files/django-logo-big.jpg",
    },
    {
      name: "Flask",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image: "https://miro.medium.com/max/1280/1*XzIRJGujfqAiOV2EIQgR_Q.png",
    },
    {
      name: "Ruby on Rails Course",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image: "https://www.clariontech.com/hubfs/BlogImage-99.png",
    },
  ];

  let designingCourseList = [
    {
      name: "BootStrap",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://www.k2bindia.com/wp-content/uploads/2013/03/bootstrap-1.jpg",
    },
    {
      name: "Material UI",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://cdn-media-1.freecodecamp.org/images/1*FDNeKIUeUnf0XdqHmi7nsw.png",
    },
    {
      name: "Tailwind CSS",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://laravelnews.imgix.net/images/tailwindcss.png?ixlib=php-3.3.1",
    },
  ];

  let databaseCourseList = [
    {
      name: "MongoDB",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://www.cloudsavvyit.com/p/uploads/2021/07/f5932bc2.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1",
    },
    {
      name: "MYSQL",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://pbs.twimg.com/profile_images/1255113654049128448/J5Yt92WW_400x400.png",
    },
    {
      name: "PHP",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://www.2440media.com/sites/default/files/assets/images/blog/The%20Best%20Software%20For%20PHP%20Coding.jpg",
    },
  ];

  let fullstackCourseList = [
    {
      name: "MEAN",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://i1.wp.com/www.goodworklabs.com/wp-content/uploads/2017/08/Mean.jpg",
    },
    {
      name: "MERN",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image:
        "https://blog.hyperiondev.com/wp-content/uploads/2018/09/Blog-Article-MERN-Stack.jpg",
    },
  ];

  let otherCourseList = [
    {
      name: "Github",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image: "https://miro.medium.com/max/700/1*JLYlSLSK8-AZo8gt9UdYqA.jpeg",
    },
    {
      name: "Visual Studio Code",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image: "https://i.ytimg.com/vi/zf01EVxxqu4/maxresdefault.jpg",
    },
    {
      name: "Git",
      description: "Course taught by Jay Sir with 20+ years in IT Industry",
      tagline: "Beginner to Advance Javascript",
      image: "https://latesthackingnews.com/wp-content/uploads/2018/09/git.jpg",
    },
  ];

  let courses = [
    { title: "Frontend Courses", data: frontendCourseList },
    { title: "Backend Courses", data: backendCourseList },
    { title: "Designing Courses", data: designingCourseList },
    { title: "Database Courses", data: databaseCourseList },
    { title: "Fullstack Courses", data: fullstackCourseList },
    { title: "Other Courses", data: otherCourseList },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
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
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container className={classes.cardGrid}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  // image={feature1}
                  // image="https://jana-sa.com/image/about-us/e762bf4b8cbc5ee9e70e7e087f99e5c3.gif"
                  image="https://cdn.dribbble.com/users/2514124/screenshots/5439070/girl_3.gif"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h" component="h2">
                    Life Time Access
                  </Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  // image={feature2}
                  image="https://i.pinimg.com/originals/16/9c/11/169c11293f5c08a325ee1bbc8a0d4cb8.gif"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h" component="h2">
                    Low Cost
                  </Typography>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  // image={feature3}
                  // image="https://mintbook.com/assetsNew/img/university.gif"
                  image="https://www.excelsisdeo.com/images/AlphaTestersAnimation_60.gif"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h" component="h2">
                    Learning at your Finger Tips
                  </Typography>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {/* Fetching courses */}
        <Container className={classes.cardGrid} maxWidth="xl">
          {courses.map((course) => (
            <div>
              <br />
              <Typography className={classes.heading} gutterBottom>
                {course.title}
              </Typography>
              <br />
              <Grid container spacing={8}>
                {course.data.map((particularCourse, index) => (
                  <Grid item key={index} xs={12} sm={6} md={3}>
                    <Link
                      to={`/course/${particularCourse._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={particularCourse.image}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h" component="h2">
                            {/* Heading */}
                            {particularCourse.name}
                          </Typography>
                          <Typography>
                            {particularCourse.description}
                            {/* This is a media card. You can use this section to
                            describe the content. */}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <br />
            </div>
          ))}
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
