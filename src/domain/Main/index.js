import "./style.css";

import Page from "../../components/Page";

import {BACKGROUND_COLOR_GRAY} from "../../data/common";
import {useScrollToBody} from "../../hooks/useScrollToBody";

import {companyList} from "../../data/company";
import {clubs} from "../../data/clubs";

import MainBanner from "./MainBanner";
import MainParticipant from "./MainParticipant";
import MainSublist from "./MainSublist";

export default function Main() {
  const [body, scrollToBody] = useScrollToBody();
  const [section1, scrollToSection1] = useScrollToBody();
  const [section2, scrollToSection2] = useScrollToBody();

  return (
    <div className={"main"}>
      {/* 페이지 상단 헤더 */}
      <MainBanner scrollToBody={scrollToBody} />

      <div className={"inner-padding"} ref={body}>
        {/* seventeen hearts festival 소개 */}
        <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}}>
          <h1 className={"section-title"}>
            <img
              src={
                require("../../assets/logos/seventeen-hearts-festival-logo-oneline.svg")
                  .default
              }
              alt={"Seventeen Hearts Festival"}
              style={{height: "100%", width: "auto", maxHeight: "2rem"}}
            />
          </h1>
          <br />

          <div className={"main-intro-content font-light"}>
            <p>
              한양대학교 사회혁신센터는 대학생들의 사회혁신에 대한 이해도를
              높이고 주도적인 활동참여를 목적으로 2016년부터 사회혁신 성과공유의
              장인{" "}
              <span
                style={{
                  fontFamily: "noto-sans-bold",
                  color: "var(--color-dark-blue)",
                }}
              >
                Seventeen Hearts Festival
              </span>
              을 개최해오고 있습니다.
            </p>
            <br />
            <p>
              Seventeen Hearts Festival은 UN-SDGs(지속가능발전목표) 17개를
              모티브로 하여, 사회혁신 선도대학이라는 브랜드 확립과 지역사회,
              대학이 함께하는 지속가능한 임팩트 창출을 목표로 하고 있습니다.
            </p>
            <br />
            <p>
              6번째를 맞는 2021년 Seventeen Hearts Festival에서는 ESG라는 사회적
              이슈를 중심으로 국내 우수기관/기업에서 가지고 있는 ESG, 사회공헌에
              대한 방향 및 목표를 확인하는 인터뷰를 진행하고 교내에서 활발하게
              활동하고 있는 재학생 소셜벤처 창업팀, 사회혁신/사회공헌 활동 팀의
              성과를 공유하는 자리를 마련하였습니다.
            </p>
          </div>

          <br />
          <br />

          <ul className={"main-intro-subsection"}>
            <li className={"main-intro-subsection-item"}>
              <div className={"title"}>기업 인터뷰</div>
              <div
                className={"main-intro-subsection-move-btn"}
                onClick={scrollToSection1}
              >
                바로가기
              </div>
              <img
                src={
                  require("../../assets/backgrounds/main-section-interview.png")
                    .default
                }
                alt={""}
              />
            </li>
            <li className={"main-intro-subsection-item"}>
              <div className={"title"}>소셜벤처</div>
              <div
                className={"main-intro-subsection-move-btn"}
                onClick={scrollToSection2}
              >
                바로가기
              </div>
              <img
                src={
                  require("../../assets/backgrounds/main-section-interview.png")
                    .default
                }
                alt={""}
              />
            </li>
          </ul>
        </Page>

        {/* 기업 리스트 */}
        <div style={{height: 0, padding: 0}} ref={section1} />
        <Page parentClassName={"home-company-list-page"}>
          <h1 className={"section-title"}>
            <div>기업 인터뷰</div>
            <div className={"subtitle"}>Interview to Companies</div>
          </h1>
          <br />

          <ul className={"home-sublist-list home-company-list"}>
            {companyList.map((company, index) => (
              <MainSublist
                info={company}
                key={index}
                index={index}
                link={`/company/${company.id}`}
              />
            ))}
          </ul>
        </Page>

        {/* 소셜벤처 리스트 */}
        <div style={{height: 0, padding: 0}} ref={section2} />
        <Page parentClassName={"home-club-list-page"}>
          <h1 className={"section-title"}>
            <div>소셜벤쳐</div>
            <div className={"subtitle"}>Social Venture</div>
          </h1>
          <br />

          <ul className={"home-sublist-list home-club-list"}>
            {clubs.map((club, index) => (
              <MainSublist
                info={club}
                key={index}
                index={index}
                link={`/club/${club.id}`}
              />
            ))}
          </ul>
        </Page>

        {/* 배리어프리 */}
        <Page parentClassName={"home-bf-list-page"}>
          <h1 className={"section-title"}>
            <div>배리어프리</div>
            <div className={"subtitle"}>Barrier-Free</div>
          </h1>
          <br />

          <div>소개</div>
        </Page>

        {/* 함께한 사람들 */}
        <MainParticipant />
      </div>
    </div>
  );
}
