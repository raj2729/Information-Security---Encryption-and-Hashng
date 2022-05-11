import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
// import CareerForm from "./components/CareerForm";
// import ContactUs from "./components/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact></Route>
      {/* <Route path="/signin" component={SignIn} exact></Route> */}
      <Route path="/signin" component={SignIn} exact></Route>
      <Route path="/signup" component={SignUp} exact></Route>
      {/* <Route path="/careerForm" component={CareerForm} exact></Route> */}
      {/* <Route path="/contactForm" component={ContactUs} exact></Route> */}
    </BrowserRouter>
  );
}

export default App;
