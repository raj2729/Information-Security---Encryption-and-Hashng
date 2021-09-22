const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/config");
const generatePDF = require("./generatePdf");

// Routes
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const discussRoutes = require("./routes/discussRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const contactFormRoute = require("./routes/contactFormRoutes");
const careerFormRoute = require("./routes/careerFormRoutes");

dotenv.config();

// Connecting to mongodb server
connectDB();

// express application
const app = express();

// allow CORS
app.use(cors());

// Body Parser middleware, no need to install body-parser package
app.use(express.json());

const PORT = process.env.PORT;

app.post("/getCertificate/:name/:course", (req, res) => {
  // res.send("<h1>Welcome to Full Stack Simplified</h1>");
  // res.download("output.pdf");
  console.log(req.params.name, req.params.course);
  generatePDF(req.params.name, req.params.course);
  res.download("CertificateOfCompletion.pdf");
});
// generatePDF("Raj Sanghavi", "HTML COURSE");

app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/order", orderRoutes);
app.use("/discuss", discussRoutes);
app.use("/testimonial", testimonialRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/admin", adminRoutes);
app.use("/instructor", instructorRoutes);
app.use("/contact", contactFormRoute);
app.use("/career", careerFormRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
