import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/common/header/Header";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Verification from "./components/verification/verification";
import StudentLogin from "./components/student-login/StudentLogin";
import ExamList from "./components/exam-list/ExamList";
import Exam from "./components/exam/Exam";
import Noticeboard from '../src/components/notice/NoticeBoard'
import ImageGallery from "./components/gallery/ImageGallery";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/student-login" component={StudentLogin} />
        <Route exact path="/exam-list" component={ExamList} />
        <Route exact path="/exam" component={Exam} />
        <Route exact path="/notice" component={Noticeboard} />
        <Route exact path="/Image-gallery" component={ImageGallery} />
        <Route exact path="/about" component={About} />
        <Route exact path="/courses" component={CourseHome} />
        <Route exact path="/students" component={Team} />
        <Route exact path="/pricing" component={Pricing} />
        <Route exact path="/director" component={Blog} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/verification" component={Verification} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
