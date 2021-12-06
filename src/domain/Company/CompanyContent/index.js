import "./style.css";

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
}) {
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
        <br />

        <ul className={"card-wrapper"}>
          <li className={"card-item"} {...firstRef}>
            <div
              style={{
                fontFamily: "nixgon-light",
                fontSize: "1.4em",
              }}
              dangerouslySetInnerHTML={{
                __html: company?.oneline || <></>,
              }}
            />
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
              src={
                company?.movie +
                "?modestbranding=1&playsinline=0&vq=hd1080&listType=playlist&list=PLBZPLe5PUG0EP30VgjaiGwkaGF7t3Q4Hm&origin=https://hearts-festival.web.app"
              }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <center className={"font-ultra-light"}>
            인터뷰 영상을 로딩 중입니다.
            <br />
            해당 오류가 계속된다면 한양대학교 사회혁신센터(
            <a href="tel:02.2220.1004" title={"한양대 사회혁신센터 전화걸기"}>
              02.2220.1004
            </a>
            )로 연락바랍니다.
          </center>
        )}
      </Page>
    </>
  );
}
