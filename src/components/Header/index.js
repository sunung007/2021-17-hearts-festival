import "./style.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function Header({
  scrollToIntro,
  scrollToInterview,
  scrollToPictures,
}) {
  const [headerShow, setHeaderShow] = useState(false);

  const headerScrollEvent = () => setHeaderShow(window.scrollY >= 600);

  useEffect(() => {
    document.addEventListener("scroll", headerScrollEvent);
    return () => document.removeEventListener("scroll", headerScrollEvent);
  }, []);

  return (
    <header
      id={"header"}
      className={headerShow ? "header-show" : "header-hide"}
    >
      <div className={"header-container"}>
        <div>
          <Link to={"/"}>
            <h2 className={"header-title"}>
              <FontAwesomeIcon icon={faArrowLeft} /> Seventeen Hearts Festival
            </h2>
          </Link>
        </div>

        <ul className={"header-menus font-light only-browser"}>
          <li onClick={scrollToIntro}>기업 소개</li>
          <li onClick={scrollToInterview}>미리보기</li>
          <li onClick={scrollToPictures}>인터뷰/사진</li>
        </ul>
      </div>
    </header>
  );
}
