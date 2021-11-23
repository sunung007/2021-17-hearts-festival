import "./style.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Header({menu, showMenu}) {
  const [headerShow, setHeaderShow] = useState(false);
  useEffect(() => {
    const headerScrollEvent = () => setHeaderShow(window.scrollY >= 600);
    document.addEventListener("scroll", headerScrollEvent);
    return () => document.removeEventListener("scroll", headerScrollEvent);
  }, []);

  return (
    <header
      id={"header"}
      className={headerShow ? "header-show" : "header-hide"}
    >
      <div className={"header-container"}>
        <Link to={"/"} className={"header-title"}>
          <img
            src={require("../../assets/logos/seventeen-hearts.svg").default}
            alt={""}
          />
          <span className={showMenu ? "only-browser" : ""}>
            Seventeen Hearts Festival
          </span>
        </Link>

        {showMenu && menu && (
          <ul className={"header-menus font-light"}>
            {menu.map((entry, index) => (
              <li key={index} onClick={entry[1]}>
                {entry[0]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
