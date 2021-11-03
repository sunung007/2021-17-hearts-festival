import "./style.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useLocation} from "react-router";

export default function Header() {
  const location = useLocation();
  const [headerShow, setHeaderShow] = useState(false);

  const headerScrollEvent = () =>
    setHeaderShow(window.scrollY > window.innerHeight);

  useEffect(() => {
    document.addEventListener("scroll", headerScrollEvent);
    return () => document.removeEventListener("scroll", headerScrollEvent);
  }, []);

  if (location.pathname !== "/")
    return (
      <header
        id={"header"}
        className={headerShow ? "header-show" : "header-hide"}
      >
        <div className={"header-container"}>
          <Link to={"/"}>
            <h2 className={"header-title"}>
              <FontAwesomeIcon icon={faArrowLeft} /> Seventeen Hearts Festival
            </h2>
          </Link>
        </div>
      </header>
    );
  else return <></>;
}
