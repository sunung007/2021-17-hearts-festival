import "./style.css";
import {useHistory, useLocation} from "react-router";
import {URLS} from "../../App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function Error() {
  const history = useHistory();
  const location = useLocation();
  const path = `/${location.pathname.split("/")[1]}`;

  // URL 바꾸기
  if (!URLS.includes(path) && path !== "/error") history.push("/error");

  if (path === "/error")
    return (
      <div className={"error"}>
        <div className={"inner-padding"}>
          <h1>NOT FOUND ERROR 404</h1>
          <h2>잘못된 페이지입니다.</h2>
          <p>링크를 다시 확인해 주세요.</p>
          <br />

          <div className={"error-go-home"} onClick={() => history.push("/")}>
            <FontAwesomeIcon icon={faArrowLeft} /> 홈으로 돌아가기
          </div>
        </div>

        {/* 배경 */}
        <div className={"error-background"}>
          <img
            src={require("../../assets/banners/hyu-love.jpg").default}
            alt={""}
          />
        </div>
      </div>
    );
  else return <></>;
}
