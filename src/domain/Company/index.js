import "./style.css";

import Page from "../../components/Page";
import {
  BACKGROUND_COLOR_GRAY,
  goToBottom,
  goToHome,
  SDGS,
} from "../../hooks/common";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faHome} from "@fortawesome/free-solid-svg-icons";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";

const companyInfo = {
  id: 0,
  name: "삼성전자",
  logo: "../../assets/logos/hyundai.svg",
  tags: [1, 2, 3],
  intro: (
    <>
      <h1>삼성전자</h1>
      <p>서울특별시 서초구 강남대로 222 ...</p>
    </>
  ),
  qna: [
    [
      "1질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문",
      "답변",
    ],
    ["질문", "답변"],
  ],
  movie: "", // 링크
};

export default function Company({history, match}) {
  const fadeInAnimation = useScrollFadeIn();
  const cid = match.params.cid;

  return (
    <div className={"company"}>
      {/* 페이지 상단 헤더 */}
      <Page className={"page-header"}>
        <div className={"page-title"}>
          <div className={"subtitle"}>17 Hearts Festver</div>
          <div className={"title"}>{companyInfo.name}</div>
        </div>

        <div className={"page-header-down-float"}>
          {/* 홈으로 가는 버튼 */}
          <button onClick={() => goToHome(history)}>
            <FontAwesomeIcon icon={faHome} />
          </button>

          {/* 아래로 내려가는 버튼 */}
          <button onClick={goToBottom}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </Page>

      {/* 내용 */}
      <div className={"inner-padding"}>
        <div className={"company-title"}>
          <div className={"company-title-name-and-logo"}>
            {/* 회사명 */}
            <span className={"company-title-name"}>{companyInfo.name}</span>
            {/* 회사 로고 */}
            <span className={"company-title-logo"}>
              <img src={companyInfo.logo} alt={"로고"} />
            </span>
          </div>
          <br />
          <div className={"company-tags"}>
            {companyInfo.tags.map((tag, index) => (
              <span key={index}>
                #_SDGs_{tag}_{SDGS[tag]}
              </span>
            ))}
          </div>
        </div>

        <Page
          className={"company-intro"}
          style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
        >
          {companyInfo.intro}
        </Page>

        <div {...fadeInAnimation} className={"company-interview-summary"}>
          <ul>
            {companyInfo.qna.map((qna, index) => (
              <li key={index} className={"company-interview-wrapper"}>
                <div className={"company-interview-question"}>
                  <div className={"company-interview-type"}>Q</div>
                  <div className={"company-interview-content"}>{qna[0]}</div>
                </div>
                <div className={"company-interview-answer"}>
                  <span className={"company-interview-type"}>A</span>
                  <span className={"company-interview-content"}>{qna[1]}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Page
          className={"company-pictures"}
          style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
        >
          <div>인터뷰 영상</div>
          <div className={"company-youtube-wrapper"}>
            <iframe
              className={"youtube-player"}
              id="youtube-player"
              title="youtube"
              type="text/html"
              src={companyInfo.movie || "https://youtube.com/"}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </Page>
      </div>
    </div>
  );
}
