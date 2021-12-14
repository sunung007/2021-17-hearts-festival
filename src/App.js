import "./App.css";

import {useEffect, useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {getNthVisitor} from "./hooks/firebase";

import Footer from "./components/Footer";

import Main from "./domain/Main";
import Company from "./domain/Company";
import Club from "./domain/Club";
import EventInfo from "./domain/EventInfo";
import Error from "./domain/Error/index";
import NthVisitor from "./domain/NthVisitor";

// import NotOpen from "./domain/NotOpen";

export const URLS = [
  "/",
  "/home",
  "/error",
  "/company",
  "/club",
  "/event",
  "/nth-visitor",
];

export default function App() {
  const [visitor, setVisitor] = useState(0);
  useEffect(() => {
    const now = new Date();
    const recent = new Date(localStorage.getItem("recent-connect"));

    if ((now - recent) / (1000 * 60) > 60) {
      getNthVisitor().then((r) => setVisitor(r));
    }
    localStorage.setItem("recent-connect", new Date());
  }, []);

  return (
    <BrowserRouter>
      {/* <Route exact path={"/"} component={NotOpen} /> */}
      {/* <Route exact path={"/home"} component={Main} /> */}

      <Route exact path={"/"} render={() => <Main visitor={visitor} />} />
      <Route exact path={"/company/:cid"} component={Company} />
      <Route exact path={"/club/:cid"} component={Club} />
      <Route exact path={"/event"} component={EventInfo} />
      <Route exact path={"/nth-visitor"} component={NthVisitor} />

      <Route path={"*"} component={Error} />

      <Footer />
    </BrowserRouter>
  );
}
