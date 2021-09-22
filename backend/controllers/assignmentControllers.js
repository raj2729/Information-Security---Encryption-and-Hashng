const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const Assignment = require("../models/assignmentModel");
const User = require("../models/userModel");

/*
LIST OF CONTROLLERS
1. Create an assignment
2. Get all assignments of a user by userId
*/

// 1. Create a new assignment
const createAssignment = asyncHandler(async (req, res) => {
  const {
    userId,
    isCertified,
    assignmentLink,
    assignmentScreenshotLink,
    courseId,
    assignmentStatus,
  } = req.body;
  // const userId = req.user._id;

  const submitted = await Assignment.find({ userId, courseId });

  if (submitted.length > 0) {
    console.log(submitted);
    // submitted[0].assignmentLink = assignmentLink;
    // submitted[0].assignmentScreenshotLink = assignmentScreenshotLink;
    // submitted[0].assignmentStatus = assignmentStatus;
    // submitted[0].isCertified = isCertified;
    // const newAssignment = new Assignment(submitted[0]);
    await Assignment.findByIdAndDelete(submitted[0]._id);
    const newAssignment = new Assignment({
      userId,
      courseId,
      isCertified,
      assignmentLink,
      assignmentScreenshotLink,
      assignmentStatus,
    });

    await newAssignment.save();

    return res.status(200).json({
      success: true,
      data: newAssignment,
    });
  }

  const course = await Course.find({ courseId });

  if (!course) {
    return res.status(400).json({
      success: false,
      message: "No such course found",
    });
  }

  const newAssignment = new Assignment({
    userId,
    courseId,
    isCertified,
    assignmentLink,
    assignmentScreenshotLink,
    assignmentStatus: assignmentStatus,
  });

  await newAssignment.save();
  // console.log(req.user);

  return res.status(200).json({
    success: true,
    data: newAssignment,
  });
});

// 2. Get all assignments of a user by userId
const getAllAssignmentsOfUser = asyncHandler(async (req, res) => {
  const orders = await Assignment.find({ userId: req.params.id }).populate(
    "courseId userId"
  );
  res.status(200).json({
    success: true,
    data: orders,
  });
});

module.exports = {
  createAssignment,
  getAllAssignmentsOfUser,
};
