import "./style.css";

import {useState} from "react";
import Page from "../../../components/Page";
import {useScrollFadeIn} from "../../../hooks/useScrollFadeIn";
import {SDGS} from "../../../data/common";

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
        <div className={"company-interview-content"}>{qna?.q}</div>
      </div>
      <div className={"company-interview-answer"}>
        <span className={"company-interview-type"}>A</span>
        <span className={"company-interview-content"}>{qna?.a}</span>
      </div>
    </li>
  );
}

function CompanyPictures({imgs}) {
  const [curImgIndex, setCurImgIndex] = useState(imgs.length > 0 ? 0 : -1);

  return (
    <Page
      className={"company-pictures-page"}
      // style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
      // style={{backgroundColor: "var(--color-blue2)", color: "white"}}
      style={{backgroundColor: "var(--color-dark-gray)", color: "white"}}
    >
      <h1 className={"section-title"}>
        <div>갤러리</div>
        <div className={"subtitle"}>Gallery</div>
      </h1>
      <br />

      {curImgIndex > -1 ? (
        <div className={"company-pictures-wrapper"}>
          {/* 확대 사진 */}
          <div className={"company-picture-big"}>
            <img src={imgs[curImgIndex]} alt={""} />
          </div>

          {/* 사진 리스트 */}
          <div className={"company-picture-slide-wrapper"}>
            <ul className={"company-picture-slide"}>
              {imgs.map((img, index) => (
                <li
                  key={index}
                  className={"company-picture"}
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
        </div>
      ) : (
        <center className={"font-ultra-light"}>준비 중입니다.</center>
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
        // style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
      >
        <div
          className={"company-intro-left"}
          style={company?.intro.length === 0 ? {margin: "auto"} : {}}
        >
          {/* 기업명 */}
          <h1 className={"section-title"}>
            <div className={"subtitle"}>{company?.oneline}</div>
            <div>{company?.name}</div>
          </h1>
          <br />

          {/* 기업 로고 */}
          <div className={"company-intro-logo"}>
            <img src={company.logo} alt={""} />
          </div>

          {/* 기업과 연관된 SDGs */}
          {company?.tags?.length > 0 && (
            <>
              <br />
              <ul className={"company-tag"}>
                {company.tags.map((tag, index) => (
                  <li key={index}>
                    <span className={"font-light"}>#SDGs{tag}_</span>
                    {SDGS[tag]}
                  </li>
                ))}
              </ul>
            </>
          )}
          <br />
        </div>

        {/* 기업 소개 문구 */}
        <div
          className={"font-light company-intro-right"}
          style={company?.intro.length === 0 ? {display: "none"} : {}}
        >
          <span dangerouslySetInnerHTML={{__html: company?.intro}}></span>
        </div>
      </Page>

      {/* 유튜브 */}
      <div style={{height: 0, padding: 0}} ref={interviewSection} />
      <Page
        className={"company-interview-page"}
        style={{backgroundColor: "var(--color-dark-blue)", color: "white"}}
      >
        <h1 className={"section-title"}>
          <div>인터뷰</div>
          <div className={"subtitle"}>Interview</div>
        </h1>
        <br />

        {company?.movie.length > 0 ? (
          <div className={"company-youtube-wrapper"}>
            <iframe
              className={"youtube-player"}
              id="youtube-player"
              title="youtube"
              type="text/html"
              src={company?.movie}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        ) : (
          <center className={"font-ultra-light"}>
            인터뷰 예정입니다. 해당 기업에 대해 궁금한 점이 있다면 방명록으로
            알려주세요.
          </center>
        )}

        {/* 인터뷰 내용 요약 */}
        {/* <ul>
          {company?.qna.map((qna, index) => (
            <Qna qna={qna} index={index} key={index} />
          ))}
        </ul> */}
      </Page>

      {/* 인터뷰 영상 & 사진 */}
      <div style={{height: 0, padding: 0}} ref={picturesSection} />
      <CompanyPictures movie={company?.movie} imgs={company?.imgs} />
    </>
  );
}
