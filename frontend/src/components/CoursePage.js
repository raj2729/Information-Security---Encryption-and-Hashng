// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Grid, Input, Paper } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GroupIcon from "@material-ui/icons/Group";
import TimerIcon from "@material-ui/icons/Timer";
import Developer from "../assets/developer.png";
import student from "../assets/student.jpg";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

//
import { Box } from "@material-ui/core";

import quiz from "../assets/quiz.png";
import discussion from '../assets/discussion.png'
import Carousel from "react-material-ui-carousel";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link } from "react-router-dom";

import VideoPlayer from "react-video-js-player";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import AddCircleIcon from "@material-ui/icons/AddCircle";

//

import {
  oneCourseDetails,
  allUserCoursesAction,
} from "../actions/courseActions";
// Loader
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

// Importing Header
import Header from "./Header";
import { isUserEnrolled } from "../actions/userActions";
import { createAssignment } from "../actions/assignmentActions";
// import PlayLecture from "./PlayLecture";

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: 'center',
  },
  bigBox: {
    width: '80%',
    height: '400px',
    backgroundColor: '#FFB830',
    margin: 'auto',
    borderRadius: '30px',
    marginTop: '30px',
  },
  bigText: {
    paddingTop: '40px',
    paddingLeft: '40px',
  },
  smallText: {
    color: 'white',
    paddingLeft: '40px',
  },
  bigBtn: {
    height: '70px',
    padding: '40px !important',
    color: '#C8C6C6',
    paddingBottom: '10px'
  },
  enroll: {
    width: '300px',
    backgroundColor: '#FF2442 !important',
    borderRadius: '999px !important',
  },
  enrollText: {
    color: 'white'
  },
  halfDiv: {
    paddingTop: '10px',
    margin: 'auto',
    width: '60%',
    backgroundColor: 'lightgrey',
    borderRadius: '30px',
    position: 'relative',
    bottom: '50px',
  },
  halfDivText: {
    paddingRight: '10px',
    textAlign: 'center',
    paddingBottom: '15px',
  },
  icons: {
    color: 'blue',
    opacity: '0.5',
    padding: '5px',
    position: 'relative',
    top: '10px',
  },
  teacher: {
    backgroundColor: '#FFB830',
  },
  teacherImg: {
    width: '200px',
    borderRadius: '999px',
    display: 'flex',
    padding: '30px',
    float: 'left',
  },
  courseItem: {
    border: '2px solid #C8C6C6',
    padding: '10px !important',
    margin: '10px',
    borderRadius: '10px',
  },
  column1: {
    flexBasis: "80%",
  },
  column: {
    flexBasis: "20%",
  },
  column2: {
    flexBasis: "100%",
  },
  root1: {
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: '200px',
    height: '50px',
    borderRadius: '999px',
  },
  uploadBtn: {
    width: '300px',
    height: '50px',
    margin: '10px !important',
  },
  uploadIcon: {
    fontSize: "100px",
    color: '#000000',
    padding: '5px',
    paddingRight: '10px',
  },
  img: {
    marginTop: '20px',
    width: '40%',
  },
  root2: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  reviewCard: {
    padding: '20px',
    width: '60%',
    boxShadow: '5px 5px 15px 5px #8f8f8f !important',
    justifyContent: 'center',
    alignItems: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
    margin: '50px auto',
  },
  manImg: {
    width: '200px',
    borderRadius: '999px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
    margin: '30px auto',
    padding: '20px',
  }
  // image: {
  //   backgroundImage:
  //     "url(https://media.istockphoto.com/vectors/online-education-vector-id960268208)",
  //   backgroundRepeat: "no-repeat",
  //   backgroundColor:
  //     theme.palette.type === "light"
  //       ? theme.palette.grey[50]
  //       : theme.palette.grey[900],
  //   backgroundSize: "cover",
  //   backgroundPosition: "",
  // },
  // paper: {
  //   margin: theme.spacing(8, 4),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  // form: {
  //   width: "60%", // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
  // //  ---------- MODAL

  // details: {
  //   alignItems: "center",
  // },
  // detailStudyMaterial: {
  //   alignItems: "left",
  // },


  // helper: {
  //   borderLeft: `2px solid ${theme.palette.divider}`,
  //   padding: theme.spacing(1, 2),
  // },
  //  ----------
}));

const loadRazorPay = async () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    // script.onload = displayRazorPay;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function CoursePage({ history, match }) {
  // ------------ MODAL
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  // ------------
  const classes = useStyles();

  const dispatch = useDispatch();
  // const [isEnrolled, setIsEnrolled] = useState(false);
  const isEnrolledInCourse = useSelector((state) => state.isEnrolledInCourse);
  const { loading: isEnrolledLoading, isEnrolled } = isEnrolledInCourse;
  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading, error, course } = courseDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const allUserCourses = useSelector((state) => state.allUserCourses);
  const { loading: allCoursesLoading, courses: allCourses } = courseDetails;
  const [
    isUserEnrolledInCourseFromAllCourses,
    setIsUserEnrolledInCourseFromAllCourses,
  ] = useState(false);

  const bearerToken = localStorage.getItem("token");

  // to handle headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  // CLOUDINARY - UPLOAD IMAGES
  const [imageSelected, setImageSelected] = useState("");
  const [publicIdd, setPublicIdd] = useState("");
  const [githubLink, setGithubLink] = useState("");
  // CLOUDINARY - UPLOAD IMAGES

  const submitAssignmentHandler = async () => {
    // console.log(files[0]);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ude8cxll");

    await axios
      .post("https://api.cloudinary.com/v1_1/dizvyn9b5/image/upload", formData)
      .then((response) => {
        console.log(response.data.secure_url);
        setPublicIdd(response.data.secure_url);
        dispatch(
          createAssignment(
            userInfo.data._id,
            match.params.id,
            response.data.secure_url,
            githubLink,
            "submit"
          )
        );
      });
  };

  useEffect(() => {
    // console.log(allUserCourses.courses.data);
    if (allUserCourses.courses && allUserCourses.courses.data) {
      allUserCourses.courses.data.map((oneCourse) => {
        // console.log(oneCourse.courseId._id);
        // console.log(match.params.id);

        if (oneCourse.courseId._id === match.params.id) {
          setIsUserEnrolledInCourseFromAllCourses(true);
        }
      });
    }

    if (userInfo) dispatch(allUserCoursesAction(userInfo.data._id));
    dispatch(oneCourseDetails(match.params.id));
  }, [dispatch, match]);

  const handleRazorpayResponse = async (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  ) => {
    const orderData = await axios.post(
      "/order/createOrder",
      {
        date: Date.now(),
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        courseId: course.data._id,
      },
      config
    );
    if (orderData.data.success === true) {
      // setIsEnrolled(true);
      // if (userInfo) dispatch(allUserCourses(userInfo.data._id));
      dispatch(isUserEnrolled(course.data._id, userInfo.data._id));
      if (userInfo) dispatch(allUserCoursesAction(userInfo.data._id));
      setIsUserEnrolledInCourseFromAllCourses(true);
      dispatch(
        createAssignment(userInfo.data._id, match.params.id, "", "", "unsubmit")
      );
      alert("Course enrolled successfully");
    } else {
      alert("Error in enrolling course");
    }
  };

  const displayRazorPay = async () => {
    const res = await loadRazorPay();

    if (!res) {
      alert("Razorpay SDK Failed. Please check your connection.");
      return;
    }

    const { data } = await axios.post("/course/razorpay");

    // console.log(data);

    const options = {
      key: "rzp_test_tOsI14GHZSP3U8", // Enter the Key ID generated from the Dashboard
      // amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // currency: "INR",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "Full Stack Simplified",
      description: "Test Transaction",
      // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        handleRazorpayResponse(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
      },
      prefill: {
        // name: "Gaurav Kumar",
        name: userInfo.data.name,
        // email: "gaurav.kumar@example.com",
        email: userInfo.data.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#DC143C",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // ALERT
  const [open, setOpen] = React.useState(true);

  return loading === false ? (
    <>
      <Header />
      <div className={classes.app} style={{ marginTop: "100px" }}>
        <div className={classes.bigBox}>
          <h1 className={classes.bigText}>
            {/* Web Development <br /> MERN Stack */}
            {course.data.name}
            <br />- {course.data.tagline}
          </h1>
          <br />
          <p className={classes.smallText}>
            {/* The Complete Web Development Course - Mastering MongoDB, ExpressJS,
          ReactJS, NodeJS */}
            {course.data.description}
          </p>
          <br />
          <span className={classes.bigBtn}>
            {isEnrolled && isEnrolled.success === true ? (
              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="#664E88"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  You have successfully enrolled in the course. Go to my course
                  to access the course.
                </Alert>
              </Collapse>
            ) : isUserEnrolledInCourseFromAllCourses === true ? (
              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  You have successfully enrolled in the course. Go to my course
                  to access the course.
                </Alert>
              </Collapse>
            ) : userInfo ? (
              <Button
                className={classes.enroll}
                variant="contained"
                onClick={displayRazorPay}
              >
                <span className={classes.enrollText}>
                  Enroll Now
                  <br />
                  for Rs.{course.data.price}
                  {/* for Rs.699 */}
                </span>
              </Button>
            ) : (
              <Link to={"/signin"} style={{ textDecoration: "none" }}>
                <Button className={classes.enroll} variant="contained">
                  <span className={classes.enrollText}>Login to enroll course</span>
                </Button>
              </Link>
            )}
          </span>
        </div>
        <div className={classes.halfDiv}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={4}>
              <div className={classes.halfDivText}>
                <VideocamIcon className={classes.icons} />
                Premium Course
              </div>
            </Grid>
            <Grid item xs={6} sm={4}>
              <div className={classes.halfDivText}>
                <HeadsetMicIcon className={classes.icons} />
                Live Doubt Solving
              </div>
            </Grid>
            <Grid item xs={6} sm={4}>
              <div className={classes.halfDivText}>
                <VerifiedUserIcon className={classes.icons} />
                Certificate
              </div>
            </Grid>
            <Grid item xs={6} sm={4}>
              <div className={classes.halfDivText}>
                <DateRangeIcon className={classes.icons} />
                Lifetime Access
              </div>
            </Grid>
            <Grid item xs={6} sm={4}>
              <div className={classes.halfDivText}>
                <GroupIcon className={classes.icons} />
                Mentorship
              </div>
            </Grid>
            <Grid item xs={6} sm={4}>
              <div className={classes.halfDivText}>
                <TimerIcon className={classes.icons} />
                Self-Paced
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{ padding: "80px 0px" }} className={classes.teacher}>
          <Grid>
            <Grid xs={12} sm={12}>
              <img
                src="https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859"
                alt="pic"
                className={classes.teacherImg}
              />
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} style={{ padding: "30px" }}>
            <h1>Meet your Teacher</h1>
            <h3>Sahil Raj</h3>
            <p>
              A professional teacher with 10+ years of experience in the
              teaching field. A professional teacher with 10+ years of
              experience in the teaching field.A professional teacher with 10+
              years of experience in the teaching field.A professional teacher
              with 10+ years of experience in the teaching field.
            </p>
          </Grid>
        </div>
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <h1>Curriculum</h1>
          <p>19sections • 242ectures • 55h 23m total length</p>
          <br />
          <Grid container spacing={2}>
            {course.data.chapters.map((chapter) => (
              <Grid item xs={15} sm={15} className={classes.courseItem} style={{ width: "100%" }}>
                <Accordion style={{ boxShadow: "none" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    {chapter.chapterNumber}. {chapter.chapterName}
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <div className={classes.column1}>
                      <strong>Description:</strong>{" "}
                      {chapter.chapterVideoDescription}
                    </div>
                    <div className={classes.column}>
                      <Button
                        disabled={
                          userInfo === null || isUserEnrolledInCourseFromAllCourses === false
                        }
                        color='primary'
                        variant="contained"
                        onClick={handleOpen}
                      >
                        {userInfo === null || isUserEnrolledInCourseFromAllCourses === false ? "Enroll course first" : "View Chapter"}
                      </Button>
                      <Modal
                        className={classes.modal}
                        open={modalOpen}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      >
                        <VideoPlayer
                          src="https://res.cloudinary.com/dizvyn9b5/video/upload/v1631600691/sgf6ftvyhfrodkgau5lm.mp4"
                          height="500%"
                        />
                      </Modal>
                    </div>
                  </AccordionDetails>
                  <AccordionDetails style={{ alignItems: "left" }}>
                    <div className={classes.column2}>
                      <strong>Study Materials:</strong>{" "}
                      {chapter.chapterStudyMaterial}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
          <Box m={2} pt={3} />
          {userInfo ? (
            userInfo.data.isInstructor === true && userInfo.data._id === course.data.instructorId ? (
              <Link
                to={`/createChapter/${course.data._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  type="submit"
                  size="large"
                  classes={{
                    root: classes.root1,
                    label: classes.label,
                  }}
                  startIcon={<AddCircleIcon />}
                >
                  Add Course
                </Button>
              </Link>
            ) : (
              <p></p>
            )
          ) : (
            <p></p>
          )}
        </div>
        <div>
          <h1>Take a Quiz and test your skills!</h1>
            <Button
              disabled={
                userInfo === null ||
                isUserEnrolledInCourseFromAllCourses === false
              }
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={()=>history.push(`/quiz/${match.params.id}`)}
            >
              <span> Start Quiz </span>
            </Button>
          {userInfo === null ? (
            <p style={{ color: "red" }}>Login to access Quiz</p>
          ) : isUserEnrolledInCourseFromAllCourses === false ? (
            <p style={{ color: "red" }}>Enroll the course to access Quiz</p>
          ) : (
            <p></p>
          )}
          <img src={quiz} className={classes.img} alt="student" />
        </div>
        <div>
          <h1>Assignment Submission</h1>
          <Input
            disabled={
              userInfo === null || isUserEnrolledInCourseFromAllCourses === false
            }
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
            className={classes.uploadBtn}
            variant="contained"
            color="primary"
            type="file"
          >
            <CloudUploadIcon className={classes.uploadIcon} />
            <span> Upload Assignment </span>
          </Input>
          {userInfo === null ? (
            <p style={{ color: "red" }}>Login to upload Assignment</p>
          ) : isUserEnrolledInCourseFromAllCourses === false ? (
            <p style={{ color: "red" }}>
              Enroll the course to upload Assignment
            </p>
          ) : (
            <p></p>
          )}
          <form className={classes.root2} noValidate autoComplete="off">
            {userInfo === null ? (
              <TextField
                disabled
                id="standard-disabled"
                label="Enter Github Repository Link"
              />
            ) : isUserEnrolledInCourseFromAllCourses === false ? (
              <TextField
                disabled
                id="standard-disabled"
                label="Enter Github Repository Link"
              />
            ) : (
              <TextField
                required
                id="standard-required"
                label="Enter Github Repository Link"
                onChange={(event) => {
                  console.log("EVENT = " + event.target.value);
                  setGithubLink(event.target.value);
                }}
              />
            )}
          </form>
          {userInfo === null ? (
            <p style={{ color: "red" }}>
              Login to submit Github Repository Link
            </p>
          ) : isUserEnrolledInCourseFromAllCourses === false ? (
            <p style={{ color: "red" }}>
              Enroll the course to submit Github Repository Link
            </p>
          ) : (
            <p></p>
          )}
          <Link to={`#`} style={{ textDecoration: "none" }}>
            <Button
              disabled={
                userInfo === null ||
                isUserEnrolledInCourseFromAllCourses === false
              }
              className={classes.button}
              color='primary'
              variant="contained"
              onClick={submitAssignmentHandler}
            >
              <span> Submit Assignment </span>
            </Button>
          </Link>
        </div>
        <div>
          <h1>Solve Your Doubts Here!!</h1>
          <img src={discussion} className={classes.img} alt="student" />
          <br/>
            <Button
              disabled={
                userInfo === null ||
                isUserEnrolledInCourseFromAllCourses === false
              }
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={()=>history.push(`/discuss/${match.params.id}`)}
            >
              Discussion Forum
            </Button>
          {userInfo === null ? (
            <p style={{ color: "red" }}>Login to upload Assignment</p>
          ) : isUserEnrolledInCourseFromAllCourses === false ? (
            <p style={{ color: "red" }}>
              Enroll the course to join the Discussion
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            backgroundColor: '#CBCBE1',
          }}
        >
          <h1 style={{ paddingTop: "70px" }}>Course Advantages</h1>
          <Grid container spacing={2}>
            {course.data.advantages.map((advantage) => (
              <Grid item xs={12} sm={6} md={4}>
                <p className="">• {advantage.advantageName}</p>
              </Grid>
            ))}
          </Grid>
          <img src={Developer} className={classes.img} alt="pic" />
        </div>
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <h1 style={{ paddingTop: "70px" }}>About this Course</h1>
          <ul style={{ textAlign: 'left' }}>
            <li style={{ lineHeight: 3 }}>
              This course doesn't cut any corners, tens of real-world projects
              which you will get to build.
            </li>
            <li style={{ lineHeight: 3 }}>
              The curriculum was developed over a period of four years, with
              comprehensive student testing and feedback.
            </li>
            <li style={{ lineHeight: 3 }}>
              You'll save yourself over Rs 50,000 by enrolling, but still get
              access to the same teaching materials and learn from the same
              instructor and curriculum as our in-person programming bootcamp.
            </li>
            <li style={{ lineHeight: 3 }}>
              The course is constantly updated with new content, with new
              projects and modules determined by students - that's you!
            </li>
          </ul>
          <img src={student} className={classes.img} alt="student" />
        </div>
        <div
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            paddingBottom: "10%",
            backgroundColor: '#CBCBE1',
          }}
        >
          <h1 style={{ paddingTop: "70px" }}>Have some query?</h1>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Why should I opt for FullStackSimplified?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                FullStackSimplified provides you the professional curated
                content by Indian instructors along with live doubt solving and
                personal one to one mentorship which you won't find anywhere
                else.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                What is the validation of the courses and when can I watch them?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You will have lifetime access to the courses and can watch the
                lectures anytime you want. So it is totally flexible and
                provides you the comfort of learning anytime anywhere. Also as
                the technologies progress we keep on updating our courses so you
                get the access to them too.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                How will my doubts be solved and will I have one-to-one
                interaction?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Your doubts will be solved on a live chat, as soon as you get a
                doubt just ping your mentor through the chat option and within
                5-10 minutes you will be connected to him to solve your doubts.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Why don't you provide live classes and why should I prefer
                recorded sessions?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                FullStackSimplified doesn't believe in the idea of teaching 100
                students in 1 class where the student sometimes feels hesitant
                to ask some doubts and where the other student feels that this
                student is wasting his time by asking silly doubts. Moreover in
                this busy world it becomes difficult to attend the classes on a
                specific schedule. So we combined the benefits and provide you
                interactive video lectures and live one on one doubt solving to
                learn at your own pace and comfort.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="reviews-div">
          <h1>Reviews</h1>
          <Carousel>
            <Card className={classes.reviewCard}>
              <img
                src="https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859"
                alt="pic"
                className={classes.manImg}
              />
              <h2 style={{ textAlign: "center" }}>Hasan Rajan</h2>
              <p style={{ textAlign: "center", color: "blue" }}>
                WEB DEVELOPER
              </p>
              <p style={{ textAlign: "center", color: "gray" }}>
                I'm baby meggings twee health goth +1. Bicycle rights tumeric
                chartreuse before they sold out chambray pop-up. Shaman
                humblebrag pickled coloring book salvia hoodie, cold-pressed
                four dollar toast everyday carry
              </p>
            </Card>

            <Card className={classes.reviewCard}>
              <img
                src="https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859"
                alt="pic"
                className={classes.manImg}
              />
              <h2 style={{ textAlign: "center" }}>Hasan Rajan</h2>
              <p style={{ textAlign: "center", color: "blue" }}>
                WEB DEVELOPER
              </p>
              <p style={{ textAlign: "center", color: "gray" }}>
                I'm baby meggings twee health goth +1. Bicycle rights tumeric
                chartreuse before they sold out chambray pop-up. Shaman
                humblebrag pickled coloring book salvia hoodie, cold-pressed
                four dollar toast everyday carry
              </p>
            </Card>

            <Card className={classes.reviewCard}>
              <img
                src="https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859"
                alt="pic"
                className={classes.manImg}
              />
              <h2 style={{ textAlign: "center" }}>Hasan Rajan</h2>
              <p style={{ textAlign: "center", color: "blue" }}>
                WEB DEVELOPER
              </p>
              <p style={{ textAlign: "center", color: "gray" }}>
                I'm baby meggings twee health goth +1. Bicycle rights tumeric
                chartreuse before they sold out chambray pop-up. Shaman
                humblebrag pickled coloring book salvia hoodie, cold-pressed
                four dollar toast everyday carry
              </p>
            </Card>
            <Card className={classes.reviewCard}>
              <img
                src="https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859"
                alt="pic"
                className={classes.manImg}
              />
              <h2 style={{ textAlign: "center" }}>Hasan Rajan</h2>
              <p style={{ textAlign: "center", color: "blue" }}>
                WEB DEVELOPER
              </p>
              <p style={{ textAlign: "center", color: "gray" }}>
                I'm baby meggings twee health goth +1. Bicycle rights tumeric
                chartreuse before they sold out chambray pop-up. Shaman
                humblebrag pickled coloring book salvia hoodie, cold-pressed
                four dollar toast everyday carry
              </p>
            </Card>
          </Carousel>
        </div>
      </div>
    </>
  ) : (
    <Box className={classes.load}>
      <CircularProgress />
    </Box>
  );
}

export default CoursePage;
