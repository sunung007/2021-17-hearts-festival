import "./style.css";
import {useHistory, useLocation} from "react-router";
import {URLS} from "../../App";
import Page from "../../components/Page/index";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function Error() {
  const history = useHistory();
  const location = useLocation();
  const path = `/${location.pathname.split("/")[1]}`;

  // URL 바꾸기
  if (!URLS.includes(path) && path !== "/error") {
    console.log("존재하지 않는 URL 입니다.");
    history.replace("/error");
  }

  // 렌더링
  if (path === "/error")
    return (
      <Page className={"error page-header"}>
        <h1>NOT FOUND ERROR 404</h1>
        <br />

        <h2>잘못된 페이지입니다.</h2>
        <br />

        <p>링크를 다시 확인해 주세요.</p>
        <br />

        <div className={"error-go-home"} onClick={() => history.push("/")}>
          <FontAwesomeIcon icon={faArrowLeft} /> 홈으로 돌아가기
        </div>

        {/* 배경 */}
        <div className={"error-background"}>
          <img
            src={require("../../assets/banners/default.jpg").default}
            alt={""}
          />
        </div>
      </Page>
    );
  else return <></>;
}
