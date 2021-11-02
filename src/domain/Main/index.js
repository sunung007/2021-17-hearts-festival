import "./style.css";

import {Link} from "react-router-dom";

import {ReactComponent as hyundai} from "../../assets/logos/hyundai.svg";

import Page from "../../components/Page";
import {BACKGROUND_COLOR_GRAY, goToBottom} from "../../hooks/common";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";

import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Main() {
  const companyList = [
    {
      id: 0,
      name: "삼성전자",
      date: "2021.09.30.",
      logo: `~~`,
      animation: useScrollFadeIn("right", 1, 0.0),
    },
    {
      id: 1,
      name: "삼성전자",
      date: "2021.09.30.",
      logo: `~~`,
      animation: useScrollFadeIn("right", 1, 0.1),
    },
    {
      id: 2,
      name: "삼성전자",
      date: "2021.09.30.",
      logo: `~~`,
      animation: useScrollFadeIn("right", 1, 0.2),
    },
    {
      id: 3,
      name: "삼성전자",
      date: "2021.09.30.",
      logo: `~~`,
      animation: useScrollFadeIn("right", 1, 0.3),
    },
  ];

  // console.log(require("./src/assets/logos/hyundai.svg"));

  return (
    <div className={"main"}>
      {/* 페이지 상단 헤더 */}
      <Page className={"page-header"}>
        <div className={"page-title"}>
          <div className={"subtitle"}>6th</div>
          <div className={"title"}>
            <div>17 Hearts</div>
            <div>Festival</div>
          </div>
          <div className={"subtitle"}>2021.9.25~28</div>
        </div>

        <div className={"page-header-intro"}>
          사랑의 실천으로 세상과 사람을 바꾸는 한양의 사회혁신축제에 여러분을
          초대합니다.
        </div>

        {/* 아래로 내려가는 버튼 */}
        <div className={"page-header-down-float"}>
          <button onClick={goToBottom}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </Page>

      <div className={"inner-padding"}>
        {/* 17-hearts 소개 */}
        <Page style={{backgroundColor: BACKGROUND_COLOR_GRAY}}>
          <h2 className={"section-title"}>
            <span>사랑의 실천</span>
            <span className={"subtitle font-light"}>
              Love in Truth and in Deed
            </span>
          </h2>
          <br />

          <center>
            <span className={"font-light"}>
              <p>한양학원의 건학정신은 근면, 정직, 겸손, 봉사할 수 있는</p>
              <p>인간형성을 도모하고, 나만을 위한 것이 아니라</p>
              <p>
                지역 사회, 나라와 겨레, 나아가 인류를 위해 이바지하는 위대한
                사랑의 실천자를 기르는 데 있다.
              </p>
            </span>

            <br />

            <p>한양대학교는 이러한 사랑의 실천자를</p>
            <p>체인지메이커(Changemaker)라고 부릅니다.</p>

            <br />

            <p>크기와 방법에 상관 없이</p>
            <p>더 나은 세상을 위한 긍정적인 변화를 만들어 낸다면</p>
            <p>우리는 모두 체인지메이커입니다.</p>
          </center>
        </Page>

        {/* 기업 리스트 */}
        <Page>
          <h2 className={"section-title"}>참여 기업</h2>
          <br />

          <ul className={"home-company-list"}>
            {companyList.map((company, index) => (
              <li
                className={"home-company-item"}
                key={index}
                {...company.animation}
              >
                <Link to={`/company/${company.id}`}>
                  <div className={"home-company-box"}>
                    <div className={"home-company-box-front"}>
                      프론트 기업 로고{company.logo}
                    </div>
                    <div className={"home-company-box-hover"}>
                      {company.name}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Page>
      </div>
    </div>
  );
}
