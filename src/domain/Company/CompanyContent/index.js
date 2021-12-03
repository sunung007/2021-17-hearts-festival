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
              src={company?.movie + "?loop=1"}
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
    </>
  );
}
