import "./style.css";
import {Link} from "react-router-dom";
import {useScrollFadeIn} from "../../../hooks/useScrollFadeIn";

export default function MainSublist({info, index, link}) {
  const fadeAnimation = useScrollFadeIn("right", 1, (index % 3) / 6);
  return (
    <li className={"home-sublist-item"} {...fadeAnimation}>
      <Link to={link}>
        <div className={"home-sublist-box"}>
          <div className={"home-sublist-box-front"}>
            <img
              src={
                info.logo ||
                require("../../../assets/logos/seventeen-hearts.png").default
              }
              alt={info.name}
            />
          </div>
          <div className={"home-sublist-box-hover"}>{info.name}</div>
        </div>
      </Link>
    </li>
  );
}
