const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const Assignment = require("../models/assignmentModel");
const User = require("../models/userModel");

/*
LIST OF CONTROLLERS
1. Create an assignment
2. Get all assignments of a user by userId
3. Get all assignments of a instructor by instructorId
4. Update assignment status to certified
*/

// 1. Create a new assignment
const createAssignment = asyncHandler(async (req, res) => {
  const {
    userId,
    isCertified,
    assignmentLink,
    assignmentScreenshotLink,
    courseId,
    instructorId,
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
      instructorId,
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
    instructorId,
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

// 3. Get all assignments of a instructor by instructorId
const getAllAssignmentsOfInstructor = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({
    instructorId: req.params.id,
    isCertified: false,
    assignmentStatus: "submit",
  }).populate("courseId");
  res.status(200).json({
    success: true,
    data: assignments,
  });
});

// 4. Update status to certified by assignment Id in params
const updateToCertified = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (assignment) {
    assignment.isCertified = true;
    const updatedAssignment = await assignment.save();
    res.status(200).json({
      success: true,
      data: updatedAssignment,
    });
  } else {
    res.status(404).json({
      success: false,
      data: "Not certified",
    });
  }
});

// 5. Update status to unsubmit by assignment Id in params
const updateToUnSubmit = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (assignment) {
    assignment.assignmentStatus = "unsubmit";
    const updatedAssignment = await assignment.save();
    res.status(200).json({
      success: true,
      data: updatedAssignment,
    });
  } else {
    res.status(404).json({
      success: false,
      data: "Not certified",
    });
  }
});

module.exports = {
  createAssignment,
  getAllAssignmentsOfUser,
  getAllAssignmentsOfInstructor,
  updateToCertified,
  updateToUnSubmit,
};
