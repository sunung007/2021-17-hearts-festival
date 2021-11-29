import "./style.css";

import {useState} from "react";
import Page from "../../../components/Page";
import {useScrollFadeIn} from "../../../hooks/useScrollFadeIn";

function CompanySectionCard({section, index}) {
  const fadeAnimation = useScrollFadeIn("up", 1, 0.3 * (1 + index));
  return (
    <li className={"card-item"} {...fadeAnimation}>
      <div className={"card-item-title"}>{section?.title}</div>
      <div className={"card-item-content"}>{section?.content}</div>
    </li>
  );
}

export default function CompanyContent({
  company,
  introSection,
  interviewSection,
  picturesSection,
}) {
  const [curImgIndex, setCurImgIndex] = useState(
    company?.imgs.length > 0 ? 0 : -1
  );

  const firstRef = useScrollFadeIn("up", 1, 0);
  return (
    <>
      <div style={{height: 0, padding: 0}} ref={introSection} />
      <Page className={"company-intro"}>
        <div
          className={"intro-text"}
          dangerouslySetInnerHTML={{
            __html: company?.intro || <></>,
          }}
        />
        <br />

        <ul className={"card-wrapper"}>
          <li className={"card-item"} {...firstRef}>
            <div
              style={{
                fontFamily: "nixgon-light",
                fontSize: "1.4em",
              }}
            >
              {company?.oneline}
            </div>
            <br />

            <div className={"company-logo"}>
              <img src={company.logo} alt={""} />
            </div>
            <br />

            <a
              className={"more-info"}
              href={company?.link}
              target={"_blank"}
              rel={"noreferrer"}
            >
              더 알아보기
            </a>
          </li>

          {company?.sections?.map((section, index) => (
            <CompanySectionCard key={index} section={section} index={index} />
          ))}
        </ul>
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
      </Page>

      {/* 인터뷰 영상 & 사진 */}
      <div style={{height: 0, padding: 0}} ref={picturesSection} />
      <Page
        className={"company-pictures-page"}
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
              <img src={company?.imgs[curImgIndex]} alt={""} />
            </div>

            {/* 사진 리스트 */}
            <div className={"company-picture-slide-wrapper"}>
              <ul className={"company-picture-slide"}>
                {company?.imgs.map((img, index) => (
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
    </>
  );
}
