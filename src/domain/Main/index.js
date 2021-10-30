import "./style.css";

import {Link} from "react-router-dom";

import {ReactComponent as hyundai} from "../../assets/logos/hyundai.svg";

import Page from "../../components/Page";
import {goToBottom} from "../../hooks/common";
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
        </div>

        {/* 아래로 내려가는 버튼 */}
        <div className={"page-header-down-float"}>
          <button onClick={goToBottom}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </Page>

      {/* 본문 */}

      <div className={"inner-padding"}>
        <Page className={"home-company-list"}>
          {companyList.map((company, index) => (
            <div
              className={"home-company-item"}
              key={index}
              {...company.animation}
            >
              <Link to={`/company/${company.id}`}>
                <div className={"home-company-box"}>
                  <div className={"home-company-box-front"}>
                    프론트 기업 로고{company.logo}
                  </div>
                  <div className={"home-company-box-hover"}>{company.name}</div>
                </div>
                <div className={"home-company-info"}>
                  <div className={"home-company-cname"}>{company.name}</div>
                  <div className={"font-light"}>{company.date}</div>
                </div>
              </Link>
            </div>
          ))}
        </Page>
      </div>
    </div>
  );
}
