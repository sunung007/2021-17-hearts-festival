import "./style.css";

import {Link} from "react-router-dom";

import Page from "../../components/Page";
import {BACKGROUND_COLOR_GRAY} from "../../hooks/common";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";

import {useScrollToBody} from "../../hooks/useScrollToBody";
import {companyList} from "../../data/company";
import MainBanner from "./MainBanner";
import MainParticipant from "./MainParticipant";
import {clubs} from "../../data/clubs";

function CompanyList({company, index}) {
  const fadeAnimation = useScrollFadeIn("right", 0.9, (index % 3) / 6);
  // const fadeAnimation = useScrollFadeIn("right", 1, 0);

  return (
    <li className={"home-company-item"} {...fadeAnimation}>
      <Link to={`/company/${company.id}`}>
        <div className={"home-company-box"}>
          <div className={"home-company-box-front"}>
            <img
              src={
                company.logo ||
                require("../../assets/logos/seventeen-hearts.png").default
              }
              alt={company.name}
            />
          </div>
          <div className={"home-company-box-hover"}>{company.name}</div>
        </div>
      </Link>
    </li>
  );
}

export default function Main() {
  const [body, scrollToBody] = useScrollToBody();

  return (
    <div className={"main"}>
      {/* 페이지 상단 헤더 */}
      <MainBanner scrollToBody={scrollToBody} />

      <div className={"inner-padding"} ref={body}>
        {/* 사랑의 실천 소개 */}
        <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}}>
          <h1 className={"section-title"}>Seventeen Hearts Festival</h1>
          <br />

          <center className={"font-light"}>
            한양학원의 건학정신은 근면, 정직, 겸손, 봉사할 수 있는
            <br />
            인간형성을 도모하고, 나만을 위한 것이 아니라
            <br />
            지역 사회, 나라와 겨레, 나아가 인류를 위해 이바지하는 위대한
            <br />
            사랑의 실천자를 기르는 데 있다.
          </center>
          <br />

          <center className={"font-light"}>
            한양대학교는 이러한 사랑의 실천자를 체인지메이커(Changemaker)라고
            부릅니다.
            <br />
            크기와 방법에 상관 없이 더 나은 세상을 위한 긍정적인 변화를 만들어
            낸다면
            <br />
            우리는 모두 체인지메이커입니다.
          </center>
        </Page>

        {/* 기업 리스트 */}
        <Page parentClassName={"home-company-list-page"}>
          <h1 className={"section-title"}>
            <div>참여 기업</div>
            <div className={"subtitle"}>Companies</div>
          </h1>
          <br />

          <ul className={"home-company-list"}>
            {companyList.map((company, index) => (
              <CompanyList company={company} key={index} index={index} />
            ))}
          </ul>
        </Page>

        {/* 기업 리스트 */}
        <Page parentClassName={"home-club-list-page"}>
          <h1 className={"section-title"}>
            <div>참여 동아리</div>
            <div className={"subtitle"}>Clubs</div>
          </h1>
          <br />

          <ul className={"home-company-list"}>
            {clubs.map((club, index) => (
              <CompanyList company={club} key={index} index={index} />
            ))}
          </ul>
        </Page>

        <MainParticipant />
      </div>
    </div>
  );
}
