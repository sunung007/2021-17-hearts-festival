import "./style.css";

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Page from "../../components/Page";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";
import {useScrollToBody} from "../../hooks/useScrollToBody";
import {BACKGROUND_COLOR_GRAY, goToHome, SDGS} from "../../hooks/common";

import {companyList} from "../../data/company";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

function Qna({qna, index}) {
  const fadeInAnimation = useScrollFadeIn("up", 1, index / 5);

  return (
    <li
      key={index}
      className={"company-interview-wrapper"}
      {...fadeInAnimation}
    >
      <div className={"company-interview-question"}>
        <div className={"company-interview-type"}>Q</div>
        <div className={"company-interview-content"}>{qna[0]}</div>
      </div>
      <div className={"company-interview-answer"}>
        <span className={"company-interview-type"}>A</span>
        <span className={"company-interview-content"}>{qna[1]}</span>
      </div>
    </li>
  );
}

function CompanyInterview({company}) {
  const [curImgIndex, setCurImgIndex] = useState(
    company.imgs.length > 0 ? 0 : -1
  );

  return (
    <>
      <Page
        className={"company-intro"}
        style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
        shadow={false}
      >
        <h1 className={"section-title"}>{company?.name}</h1>
        <br />

        <div className={"company-tags font-light"}>
          {company?.tags.map((tag, index) => (
            <span key={index}>
              #_SDGs_{tag}_{SDGS[tag]}
            </span>
          ))}
        </div>
        <br />

        <div className={"font-light"}>{company?.intro}</div>
      </Page>

      <ul className={"company-interview-summary"}>
        {company?.qna.map((qna, index) => (
          <Qna qna={qna} index={index} />
        ))}
      </ul>

      <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}}>
        <h1 className={"section-title"}>인터뷰</h1>
        <br />

        <div
          className={"company-pictures-wrapper"}
          style={
            curImgIndex === -1
              ? {
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }
              : {}
          }
        >
          {/* 유튜브 */}
          <div className={"company-youtube-wrapper"}>
            {company.movie.length === 0 ? (
              <div className={"youtube-player youtube-player-error"}>
                준비 중입니다.
              </div>
            ) : (
              <iframe
                className={"youtube-player"}
                id="youtube-player"
                title="youtube"
                type="text/html"
                src={company?.movie}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            )}
          </div>

          {/* 확대 사진 */}
          {curImgIndex > -1 && (
            <div className={"company-picture"}>
              <img src={company.imgs[curImgIndex]} alt={""} />
            </div>
          )}
        </div>

        {/* 사진 리스트 */}
        {curImgIndex > -1 && (
          <div className={"company-picture-slide-wrapper"}>
            <ul className={"company-picture-slide"}>
              {company?.imgs.map((img, index) => (
                <li
                  className={"company-picture"}
                  key={index}
                  onClick={() => setCurImgIndex(index)}
                >
                  <img src={img} alt={""} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Page>
    </>
  );
}

export default function Company({history, match}) {
  const [body, scrollToBody] = useScrollToBody();
  const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    const cid = parseInt(match.params.cid);
    const tmpCompany = companyList.filter((entry) => entry.id === cid);
    if (tmpCompany.length === 0) history.push("/error");
    else setCompanyData(tmpCompany[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <span>17 Hearts Festiver</span>
            </Link>
          </div>
          <div className={"title"}>{companyData?.name}</div>
        </div>

        <div className={"page-header-down-float"}>
          {/* 홈으로 가는 버튼 */}
          <button onClick={() => goToHome(history)}>
            <FontAwesomeIcon icon={faHome} />
          </button>

          {/* 아래로 내려가는 버튼 */}
          <button onClick={scrollToBody}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </Page>

      {/* 내용 */}
      <div className={"inner-padding"} ref={body}>
        {companyData.hasOwnProperty("id") && companyData.isReady ? (
          <CompanyInterview company={companyData} />
        ) : (
          <Page className={"company-not-ready font-light"}>
            해당 기업은 인터뷰 준비 중입니다.
          </Page>
        )}
      </div>
    </div>
  );
}
