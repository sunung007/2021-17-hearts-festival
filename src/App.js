import "./App.css";

import {useEffect} from "react";
import {HashRouter, Route} from "react-router-dom";
import {logConnect} from "./hooks/firebase";

import Footer from "./components/Footer";

import Main from "./domain/Main";
import Company from "./domain/Company";
import Club from "./domain/Club";
import Error from "./domain/Error/index";

export const URLS = ["/", "/error", "/company", "/club"];

export default function App() {
  useEffect(() => {
    logConnect(); // Firebase logging 시작
  }, []);

  return (
    <HashRouter>
      <Route exact path={"/"} component={Main} />
      <Route exact path={"/company/:cid"} component={Company} />
      <Route exact path={"/club/:cid"} component={Club} />

      <Route path={"*"} component={Error} />

      <Footer />
    </HashRouter>
  );
}
