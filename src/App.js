import "./App.css";

import {HashRouter, Route} from "react-router-dom";

import Main from "./domain/Main";
import Footer from "./components/Footer";
import Company from "./domain/Company";
import Error from "./domain/Error/index";
import Header from "./components/Header";

export const URLS = ["/", "/company", "/error"];

function App() {
  return (
    <HashRouter>
      <Header />
      <Route exact path={"/"} component={Main} />
      <Route exact path={"/company/:cid"} component={Company} />

      <Route exact path={"/error"} component={Error} />
      <Route path={"*"} component={Error} />

      <Footer />
    </HashRouter>
  );
}

export default App;
