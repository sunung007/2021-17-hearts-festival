import "./style.css";
import {useEffect} from "react";
import {Link} from "react-router-dom";

export default function Header() {
  const headerScrollEvent = () => {
    const headerEl = document.getElementById("header");

    if (window.scrollY > window.innerHeight) {
      headerEl.style.display = "block";
      headerEl.style.transition = "all 500ms";
      headerEl.style.opacity = "1";
    } else {
      headerEl.style.display = "none";
      headerEl.style.opacity = "0";
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", headerScrollEvent);
    return () => document.removeEventListener("scroll", headerScrollEvent);
  }, []);
  return (
    <header id={"header"} style={{display: "none"}}>
      <div className={"header-container"}>
        <Link to={"/"}>
          <h2>Seventeen Hearts Festival</h2>
        </Link>
      </div>
    </header>
  );
}
