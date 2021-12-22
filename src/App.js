import "./App.css";

import {BrowserRouter, Route} from "react-router-dom";

import Footer from "./components/Footer";

import Main from "./domain/Main";
import Company from "./domain/Company";
import Club from "./domain/Club";
import EventInfo from "./domain/EventInfo";
import Error from "./domain/Error/index";

export const URLS = ["/", "/home", "/error", "/company", "/club", "/event"];

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path={"/"} render={() => <Main />} />
      <Route exact path={"/company/:cid"} component={Company} />
      <Route exact path={"/club/:cid"} component={Club} />
      <Route exact path={"/event"} component={EventInfo} />

      <Route path={"*"} component={Error} />

      <Footer />
    </BrowserRouter>
  );
}
