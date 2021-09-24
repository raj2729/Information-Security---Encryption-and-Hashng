import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Header from "./Header";
import { Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { CircularProgress } from "@material-ui/core";

import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const InstructorAssignmentPage = ({ match }) => {
  const classes = useStyles();
  const [instructorAssignments, setinstructorAssignments] = useState({});
  //   let instructorAssignments = [];
  const [loaded, setLoaded] = useState(false);
  let vary = 0;

  useEffect(() => {
    fetch(
      `http://localhost:8080/assignment/getAllAssignmentsOfInstructor/${match.params.id}`,
      { method: "GET" }
    )
      .then((response) =>
        // console.log(response);
        // return response;
        response.json()
      )
      .then((response) => {
        // console.log(response);
        setinstructorAssignments(response.data);
        setLoaded(true);
        return response;
      });
    // console.log(instructorAssignments.data);
  }, [match, vary]);

  const approvedClickHandler = async (id) => {
    console.log(id);
    // console.log(row._id);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    // // setPublicIdd(response.data.secure_url);
    await fetch(
      `http://localhost:8080/assignment/updateToCertified/${id}`,
      requestOptions
    )
      .then((response) => {
        response.json();
      })
      .then((response) => {
        // setLoaded(false);
        fetch(
          `http://localhost:8080/assignment/getAllAssignmentsOfInstructor/${match.params.id}`,
          { method: "GET" }
        )
          .then((response) => response.json())
          .then((response) => {
            setinstructorAssignments(response.data);
            setLoaded(true);
            vary = 3;
            // history.push(`/}`);
            // alert("Assignment has been approved");
          });
        // console.log(response);
      });
  };

  const discardClickHandler = async (id) => {
    console.log(id);
    // console.log(row._id);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    // // setPublicIdd(response.data.secure_url);
    await fetch(
      `http://localhost:8080/assignment/updateToUnSubmit/${id}`,
      requestOptions
    )
      .then((response) => {
        response.json();
      })
      .then((response) => {
        // setLoaded(false);
        fetch(
          `http://localhost:8080/assignment/getAllAssignmentsOfInstructor/${match.params.id}`,
          { method: "GET" }
        )
          .then((response) => response.json())
          .then((response) => {
            setinstructorAssignments(response.data);
            setLoaded(true);
            vary = 3;
            // history.push(`/}`);
            // alert("Assignment has been approved");
          });
        // console.log(response);
      });
  };

  return (
    <div
      style={{
        padding: "5%",
        backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      }}
    >
      <Header />
      <h1 style={{ paddingTop: "30px" }}>Students Work</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Course Name</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Github Link</TableCell>
              <TableCell align="center">Approved</TableCell>
              <TableCell align="center">Declined</TableCell>
              {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded === false ? (
              <CircularProgress />
            ) : instructorAssignments.length === 0 ? (
              <center>
                <p style={{ color: "red" }}>No assignments left to check</p>
              </center>
            ) : (
              instructorAssignments.map((row) => (
                <TableRow key={row.courseName}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ paddingLeft: "7%" }}
                  >
                    {row.courseId.name}
                  </TableCell>
                  {/* <TableCell align="right">{row.courseName}</TableCell> */}
                  <TableCell style={{ paddingLeft: "6%" }}>
                    <a target="_blank" href={row.assignmentLink}>
                      View
                    </a>
                  </TableCell>
                  <TableCell style={{ paddingLeft: "8%" }}>
                    <a target="_blank" href={row.assignmentScreenshotLink}>
                      View
                    </a>
                  </TableCell>
                  <TableCell style={{ paddingLeft: "8%" }}>
                    <Button
                      style={{ backgroundColor: "#3be37b" }}
                      onClick={() => {
                        approvedClickHandler(row._id);
                      }}
                    >
                      <CheckCircleIcon />
                      Approved
                    </Button>
                  </TableCell>
                  <TableCell style={{ paddingLeft: "8%" }}>
                    <Button
                      style={{ backgroundColor: "#e33b46" }}
                      onClick={() => {
                        discardClickHandler(row._id);
                      }}
                    >
                      <CancelIcon />
                      Discard
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InstructorAssignmentPage;
