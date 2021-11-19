import "./style.css";
import {Link} from "react-router-dom";
import Page from "../Page";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function DetailHeaderPage({
  title,
  background,
  prev,
  next,
  scrollToBody,
  baseURL,
}) {
  return (
    <Page parentClassName={"detail-header"} className={"page-header"}>
      <div className={"page-title"}>
        <div className={"subtitle"}>
          <Link to={"/"}>
            <span className={"page-title-go-back-home-arrow"}>
              <FontAwesomeIcon icon={faChevronLeft} />{" "}
            </span>
            <span>Seventeen Hearts Festiver</span>
          </Link>
        </div>

        <div className={"title"}>{title}</div>
      </div>

      <div className={"background"}>
        <img
          src={
            background || require("../../assets/banners/default.png").default
          }
          alt={""}
        />
      </div>

      <div className={"page-header-down-float"}>
        <Link
          to={`${baseURL}/${prev?.id}`}
          className={"go-sibling font-light"}
          style={!prev.hasOwnProperty("id") ? {visibility: "hidden"} : {}}
        >
          <span>{"< "}</span>
          <span>{prev?.name}</span>
        </Link>

        <div>
          {/* 홈으로 가는 버튼 */}
          <button>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </button>

          {/* 아래로 내려가는 버튼 */}
          <button onClick={scrollToBody}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>

        <Link
          to={`${baseURL}/${next?.id}`}
          className={"go-sibling font-light"}
          style={!next.hasOwnProperty("id") ? {visibility: "hidden"} : {}}
        >
          <span>{next?.name}</span>
          <span>{" >"}</span>
        </Link>
      </div>
    </Page>
  );
}
