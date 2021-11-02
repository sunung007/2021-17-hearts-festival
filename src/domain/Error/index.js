import "./style.css";
import {useHistory, useLocation} from "react-router";
import {URLS} from "../../App";

export default function Error() {
  const history = useHistory();
  const location = useLocation();
  const path = `/${location.pathname.split("/")[1]}`;
  console.log(path);
  console.log(!URLS.includes(path));

  if (!URLS.includes(path))
    return <div className={"error"}>에러 페이지 입니다.</div>;
  else return <></>;
}
