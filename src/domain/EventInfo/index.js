import "./style.css";

import {useHistory} from "react-router";

import Page from "../../components/Page/index";
import EventComment from "./EventComment";

import seventeenLogo from "../../assets/backgrounds/seventeen-hearts-festival-logo.svg";
import interviewSection from "../../assets/backgrounds/main-section-interview.svg";
import homeSection from "../../assets/backgrounds/main-section-social-venture.svg";
import hylionEvetnSection from "../../assets/etc/event-hylion.svg";

export default function EventInfo({closeFunc = undefined}) {
  const history = useHistory();

  return (
    <div className={"event inner-padding"}>
      <Page>
        <div className={"page-title"}>
          <img
            className={"logo"}
            src={seventeenLogo}
            alt={"Seventeen Hearts Festival"}
          />
          <div style={{fontSize: "3rem", marginTop: "0.5em"}}>
            <span style={{color: "yellow"}}>!</span>EVENT 안내
            <span style={{color: "yellow"}}>!</span>
          </div>
        </div>
        <center>푸짐한 상품이 팍팍팍!</center>
      </Page>

      <Page className={"event-info-container"}>
        <ul className={"event-wrapper"}>
          <li>
            <div
              className={"title"}
              style={{backgroundColor: "rgb(233, 0, 0)"}}
            >
              EVENT 1.{" "}
              <span className={"highlight"}>
                동영상을 시청하고 방명록을 작성하라!
              </span>
            </div>

            <div className={"content"}>
              ESG와 사회공헌에 대해 노력하고 있는 기관과 기업의 인터뷰 영상을
              보고 방명록을 작성해주세요!
              <br />더 많은 인터뷰에 방명록을 작성하면 당첨 확률이 UP!
            </div>

            <div
              className={"button main-intro-subsection-item"}
              onClick={() => {
                if (closeFunc !== undefined) closeFunc();
                else history.push("/");
              }}
            >
              <div className={"title"}>기업 인터뷰</div>
              <div className={"main-intro-subsection-move-btn"}>바로가기</div>
              <img src={interviewSection} alt={""} />
            </div>
          </li>

          <li>
            <div
              className={"title"}
              style={{backgroundColor: "rgb(0, 109, 233)"}}
            >
              EVENT 2. <span className={"highlight"}>N번째 방문자?!</span>
            </div>

            <div className={"subtitle"}>
              EVENT 2-1. 홈페이지 N번째 방문자에게 기프티콘을 드립니다.
            </div>
            <div className={"content"}>
              홈페이지에 더 자주 방문하고 더 많은 내용을 확인해서 확률을
              높여보세요!
            </div>
            <div className={"comment"}>
              * 방문 횟수는 1시간에 1번으로 제한되어 측정됩니다.
            </div>

            <div
              className={"button main-intro-subsection-item"}
              onClick={() => {
                if (closeFunc !== undefined) closeFunc();
                else history.push("/");
              }}
            >
              <div className={"title"}>다양한 콘텐츠</div>
              <div className={"main-intro-subsection-move-btn"}>바로가기</div>
              <img src={homeSection} alt={""} />
            </div>
            <br />

            <div className={"subtitle"}>EVENT 2-2. N은 과연 무엇일까요?</div>
            <div className={"content"}>
              N을 맞추시는 분들 중 추첨을 통해 기프티콘을 드립니다!
              <br />
              정답을 아시는 분은 아래 댓글창에 댓글로 남겨주세요!
            </div>
            <div className={"comment"}>
              * HINT : 유엔의 지속가능발전목표(SDGs)는 몇년도까지 달성하는 것이
              목표일까요?
            </div>
          </li>

          <li>
            <div
              className={"title"}
              style={{backgroundColor: "rgb(219, 0, 233)"}}
            >
              EVENT 3.{" "}
              <span className={"highlight"}>이 하이리온은 어떤 SDGs?</span>
            </div>
            <div className={"content"}>
              아래 하이리온들은 어떤 SDGs를 나타내고 있을까요? 각 하이리온들이
              나타내는 SDGs를 맞춰보세요!
              <br />
              정답을 아시는 분은 아래 댓글창에 댓글로 남겨주세요!
            </div>
            <div className={"comment"}>
              * 정답자 중 추첨을 통해 기프티콘이 제공됩니다.
            </div>

            <div>
              <img
                src={hylionEvetnSection}
                alt={""}
                className={"hylion-question"}
              />
            </div>
          </li>
        </ul>
      </Page>

      <EventComment />
    </div>
  );
}
