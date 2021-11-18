import "./style.css";

import {useScrollFadeIn} from "../../../hooks/useScrollFadeIn";
import {BACKGROUND_COLOR_GRAY, SDGS} from "../../../hooks/common";
import Page from "../../../components/Page";
import {useState} from "react";

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
    <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}}>
      <h1 className={"section-title"}>
        <div>인터뷰</div>
        <div className={"subtitle"}>Interview</div>
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

export default function CompanyContent({
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
      >
        <div className={"company-intro-left"}>
          {/* 기업명 */}
          <h1 className={"section-title"}>
            <div className={"subtitle font-ultra-light"}>
              {company?.oneline}
            </div>
            <div>{company?.name}</div>
          </h1>
          <br />

          {/* 기업 로고 */}
          <div className={"company-intro-logo"}>
            <img src={company.logo} alt={""} />
          </div>
          <br />

          {/* 기업과 연관된 SDGs */}
          <ul className={"company-tag"}>
            {company?.tags.map((tag, index) => (
              <li key={index}>
                <span className={"font-light"}>#SDGs{tag}_</span>
                {SDGS[tag]}
              </li>
            ))}
          </ul>
          <br />
        </div>

        {/* 기업 소개 문구 */}
        <div className={"font-light company-intro-right"}>{company?.intro}</div>
      </Page>

      {/* 인터뷰 요약 */}
      <div style={{height: 0, padding: 0}} ref={interviewSection} />
      <Page parentClassName={"company-interview-page"}>
        <h1 className={"section-title"}>
          <div>미리보기</div>
          <div className={"subtitle"}>Preview</div>
        </h1>
        <br />

        <ul>
          {company?.qna.map((qna, index) => (
            <Qna qna={qna} index={index} key={index} />
          ))}
        </ul>
      </Page>

      {/* 인터뷰 영상 & 사진 */}
      <div style={{height: 0, padding: 0}} ref={picturesSection} />
      <CompanyPictures movie={company?.movie} imgs={company?.imgs} />
    </>
  );
}
