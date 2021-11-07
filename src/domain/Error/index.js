import "./style.css";
import {useHistory, useLocation} from "react-router";
import {URLS} from "../../App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function Error() {
  const history = useHistory();
  const location = useLocation();
  const path = `/${location.pathname.split("/")[1]}`;

  if (!URLS.includes(path))
    return (
      <div className={"error"}>
        <div>
          <h1>NOT FOUND ERROR 404</h1>
          <h2>잘못된 페이지입니다.</h2>
          <br />

          <p>링크를 다시 확인해 주세요.</p>
          <br />

          <button onClick={() => history.push("/")}>
            <FontAwesomeIcon icon={faArrowLeft} /> 홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  else return <></>;
}
