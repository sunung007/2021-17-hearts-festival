import "./style.css";

import {Link} from "react-router-dom";

import titleBackground from "../../assets/title-background.svg";

import Page from "../../components/Page";
import {BACKGROUND_COLOR_GRAY} from "../../hooks/common";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";

import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useScrollToBody} from "../../hooks/useScrollToBody";
import {companyList} from "../../data/company";

function CompanyList({company, index}) {
  const fadeAnimation = useScrollFadeIn("right", 0.9, index / 9);

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
      <Page className={"page-header"}>
        <div className={"page-title"}>
          <div className={"title"}>
            <h4 className={"subtitle"}>6th</h4>
            <div>17 Hearts</div>
            <div>Festival</div>
            <div className={"subtitle"}>2021.9.25~28</div>
            <img
              className={"main-header-title-background"}
              src={titleBackground}
              alt={"background"}
            />
          </div>

          <br />
          <h4 className={"page-header-intro subtitle"}>
            사랑의 실천으로 세상과 사람을 바꾸는 한양의 사회혁신축제에 여러분을
            초대합니다.
          </h4>
        </div>

        {/* 아래로 내려가는 버튼 */}
        <div className={"page-header-down-float"}>
          <button onClick={scrollToBody}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </Page>

      <div className={"inner-padding"} ref={body}>
        {/* 사랑의 실천 소개 */}
        <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}} shadow={false}>
          <h1 className={"section-title"}>
            <div>사랑의 실천</div>
            <div className={"subtitle font-light"}>
              Love in Truth and in Deed
            </div>
          </h1>
          <br />

          <p className={"font-light"}>
            <center>
              한양학원의 건학정신은 근면, 정직, 겸손, 봉사할 수 있는
              <br />
              인간형성을 도모하고, 나만을 위한 것이 아니라
              <br />
              지역 사회, 나라와 겨레, 나아가 인류를 위해 이바지하는 위대한
              <br />
              사랑의 실천자를 기르는 데 있다.
            </center>
          </p>
          <br />

          <p className={"font-light"}>
            <center>
              한양대학교는 이러한 사랑의 실천자를 체인지메이커(Changemaker)라고
              부릅니다.
              <br />
              크기와 방법에 상관 없이 더 나은 세상을 위한 긍정적인 변화를 만들어
              낸다면
              <br />
              우리는 모두 체인지메이커입니다.
            </center>
          </p>
        </Page>

        {/* 기업 리스트 */}
        <Page>
          <h1 className={"section-title"}>
            <div>참여 기업</div>
            <div className={"subtitle font-light"}>Companies</div>
          </h1>
          <br />

          <ul className={"home-company-list"}>
            {companyList.map((company, index) => (
              <CompanyList company={company} key={index} index={index} />
            ))}
          </ul>
        </Page>

        <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}}>
          <h1 className={"section-title"}>
            <div>함께한 사람들</div>
            <div className={"subtitle font-light"}>Epilogue</div>
          </h1>
        </Page>
      </div>
    </div>
  );
}
