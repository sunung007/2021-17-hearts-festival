import "./style.css";

import Page from "../../components/Page";
import {
  BACKGROUND_COLOR_GRAY,
  goToBottom,
  goToHome,
  SDGS,
} from "../../hooks/common";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";
import {Link} from "react-router-dom";

const companyInfo = {
  id: 0,
  name: "삼성전자",
  logo: "../../assets/logos/hyundai.svg",
  tags: [1, 2, 3],
  intro: (
    <>
      {/* <h2 className={"section-title"}>삼성전자</h2> */}
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
  movie: "https://www.youtube.com/embed/FGGWeZ6oeaM?feature=oembed", // 링크
};

export default function Company({history, match}) {
  const fadeInAnimation = useScrollFadeIn();
  const cid = match.params.cid;

  return (
    <div className={"company"}>
      {/* 페이지 상단 헤더 */}
      <Page className={"page-header"}>
        <div className={"page-title"}>
          <div className={"subtitle"}>
            <Link to={"/"}>
              <span className={"page-title-go-back-home-arrow"}>
                <FontAwesomeIcon icon={faArrowLeft} />{" "}
              </span>
              <span>17 Hearts Festver</span>
            </Link>
          </div>
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
        {/* <div className={"company-title"}>
          <div className={"company-title-name-and-logo"}>
            회사명
            <span className={"company-title-name"}>{companyInfo.name}</span>
            회사 로고
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
        </div> */}

        <Page
          className={"company-intro"}
          style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
          shadow={false}
        >
          <h2 className={"section-title"}>{companyInfo.name}</h2>
          <br />

          <div className={"company-tags"}>
            {companyInfo.tags.map((tag, index) => (
              <span key={index}>
                #_SDGs_{tag}_{SDGS[tag]}
              </span>
            ))}
          </div>
          <br />

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

        <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}}>
          <h2 className={"section-title"}>인터뷰 영상</h2>
          <br />

          <div className={"company-pictures"}>
            <div className={"company-youtube-wrapper"}>
              <iframe
                className={"youtube-player"}
                id="youtube-player"
                title="youtube"
                type="text/html"
                src={companyInfo.movie}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </Page>
      </div>
    </div>
  );
}
