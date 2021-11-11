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
  faArrowAltCircleUp,
  faArrowDown,
  faChevronLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import {banners} from "../../data/banner";

function GuestComment() {
  const commentEnroll = () => {};

  return (
    <Page>
      <h1 className={"section-title"}>
        <div>방명록</div>
        <div className={"subtitle font-light"}>Interview</div>
      </h1>
      <br />

      <div>
        <form className={"guest-comment-enroll"} onSubmit={commentEnroll}>
          <input id={"quest-comment"} type={"text"} className={"font-light"} />
          <button className={"guest-comment-enroll-btn"}>
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
          </button>
        </form>

        <ul></ul>
      </div>
    </Page>
  );
}

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

function CompanyPictures({movie, imgs}) {
  const [curImgIndex, setCurImgIndex] = useState(imgs.length > 0 ? 0 : -1);

  return (
    <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}} shadow={false}>
      <h1 className={"section-title"}>
        <div>인터뷰</div>
        <div className={"subtitle font-light"}>Interview</div>
      </h1>
      <br />

      <div
        className={`company-pictures-wrapper ${
          curImgIndex === -1 && "only-youtube"
        }`}
      >
        {/* 유튜브 */}
        <div className={"company-youtube-wrapper"}>
          {movie.length === 0 ? (
            <div className={"youtube-player youtube-player-error"}>
              준비 중입니다.
            </div>
          ) : (
            <iframe
              className={"youtube-player"}
              id="youtube-player"
              title="youtube"
              type="text/html"
              src={movie}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          )}
        </div>

        {/* 확대 사진 */}
        {curImgIndex > -1 && (
          <div className={"company-picture"}>
            <img src={imgs[curImgIndex]} alt={""} />
          </div>
        )}
      </div>

      {/* 사진 리스트 */}
      {curImgIndex > -1 && (
        <>
          <div className={"company-picture-slide-wrapper"}>
            <ul className={"company-picture-slide"}>
              {imgs.map((img, index) => (
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
          <div className={"company-picture-slide-helper font-light"}>
            * 사진을 누르면 크게 보입니다.
          </div>
        </>
      )}
    </Page>
  );
}

function CompanyInterview({
  company,
  introSection,
  interviewSection,
  picturesSection,
}) {
  return (
    <>
      <div style={{height: 0, padding: 0}} ref={introSection} />
      <Page
        className={"company-intro"}
        style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
        shadow={false}
      >
        {/* 기업명 */}
        <h1 className={"section-title"}>{company?.name}</h1>
        {/* 기업 로고 */}
        <div className={"company-intro-logo"}>
          <img src={company.logo} alt={""} />
        </div>
        <br />

        {/* 기업과 연관된 SDGs */}
        <div className={"company-tags font-light"}>
          {company?.tags.map((tag, index) => (
            <span key={index}>
              #_SDGs_{tag}_{SDGS[tag]}
            </span>
          ))}
        </div>
        <br />

        {/* 기업 소개 문구 */}
        <div className={"font-light"}>{company?.intro}</div>
      </Page>

      {/* 인터뷰 요약 */}
      <ul className={"company-interview-summary"} ref={interviewSection}>
        {company?.qna.map((qna, index) => (
          <Qna qna={qna} index={index} key={index} />
        ))}
      </ul>

      {/* 인터뷰 영상 & 사진 */}
      <div style={{height: 0, padding: 0}} ref={picturesSection} />
      <CompanyPictures movie={company?.movie} imgs={company?.imgs} />

      <GuestComment />
    </>
  );
}

export default function Company({history, match}) {
  const [body, scrollToBody] = useScrollToBody();
  const [intro, scrollToIntro] = useScrollToBody();
  const [interview, scrollToInterview] = useScrollToBody();
  const [pictures, scrollToPictures] = useScrollToBody();

  const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    const cid = parseInt(match.params.cid);
    const tmpCompany = companyList.filter((entry) => entry.id === cid);
    if (tmpCompany.length === 0) history.push("/error");
    else setCompanyData(tmpCompany[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        scrollToIntro={scrollToIntro}
        scrollToInterview={scrollToInterview}
        scrollToPictures={scrollToPictures}
      />

      <div className={"company"}>
        {/* 페이지 상단 헤더 */}
        <Page className={"page-header"}>
          <div className={"page-title"}>
            <div className={"subtitle"}>
              <Link to={"/"}>
                <span className={"page-title-go-back-home-arrow"}>
                  <FontAwesomeIcon icon={faChevronLeft} />{" "}
                </span>
                <span>17 Hearts Festiver</span>
              </Link>
            </div>

            <div className={"title"}>{companyData?.name}</div>
          </div>

          <div className={"company-banner-background"}>
            <img
              src={
                banners.filter((r) => r.id === companyData?.id)[0]
                  ?.background ||
                require("../../assets/banners/default.png").default
              }
              alt={""}
            />
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
            <CompanyInterview
              company={companyData}
              introSection={intro}
              interviewSection={interview}
              picturesSection={pictures}
            />
          ) : (
            <Page className={"company-not-ready font-light"}>
              해당 기업은 인터뷰 준비 중입니다.
            </Page>
          )}
        </div>
      </div>
    </>
  );
}
