const express = require("express");

const {
  createAssignment,
  getAllAssignmentsOfUser,
} = require("../controllers/assignmentControllers");

const {
  instructorProtect,
  protect,
} = require("../middlewares/protectedRoutes");

const router = express.Router();

// Submit new Assignment
router.route("/submitAssignment").post(createAssignment);

// Get all assignments of a user by userId
router.route("/getAssignmentsOfUser/:id").get(getAllAssignmentsOfUser);

module.exports = router;
