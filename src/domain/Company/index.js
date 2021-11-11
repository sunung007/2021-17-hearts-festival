import "./style.css";

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Header from "../../components/Header";
import Page from "../../components/Page";

import {BACKGROUND_COLOR_GRAY, goToHome} from "../../hooks/common";
import {useScrollToBody} from "../../hooks/useScrollToBody";

import {banners} from "../../data/banner";
import {companyList} from "../../data/company";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import CompanyContent from "./CompanyContent";
import GuestComment from "./GuestComment";

export default function Company({history, match}) {
  const [body, scrollToBody] = useScrollToBody();
  const [intro, scrollToIntro] = useScrollToBody();
  const [interview, scrollToInterview] = useScrollToBody();
  const [pictures, scrollToPictures] = useScrollToBody();

  const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    const cid = parseInt(match.params.cid);
    const tmpCompany = companyList.filter((entry) => entry.id === cid);
    if (tmpCompany.length === 0) history.push("/error");
    else setCompanyData(tmpCompany[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        scrollToIntro={scrollToIntro}
        scrollToInterview={scrollToInterview}
        scrollToPictures={scrollToPictures}
      />

      <div className={"company"}>
        {/* 페이지 상단 헤더 */}
        <Page className={"page-header"}>
          <div className={"page-title"}>
            <div className={"subtitle"}>
              <Link to={"/"}>
                <span className={"page-title-go-back-home-arrow"}>
                  <FontAwesomeIcon icon={faChevronLeft} />{" "}
                </span>
                <span>17 Hearts Festiver</span>
              </Link>
            </div>

            <div className={"title"}>{companyData?.name}</div>
          </div>

          <div className={"company-banner-background"}>
            <img
              src={
                banners.filter((r) => r.id === companyData?.id)[0]
                  ?.background ||
                require("../../assets/banners/default.png").default
              }
              alt={""}
            />
          </div>

          <div className={"page-header-down-float"}>
            {/* 홈으로 가는 버튼 */}
            <button onClick={() => goToHome(history)}>
              <FontAwesomeIcon icon={faHome} />
            </button>

            {/* 아래로 내려가는 버튼 */}
            <button onClick={scrollToBody}>
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
        </Page>

        {/* 내용 */}
        <div className={"inner-padding"} ref={body}>
          {companyData.hasOwnProperty("id") && companyData.isReady ? (
            <CompanyContent
              company={companyData}
              introSection={intro}
              interviewSection={interview}
              picturesSection={pictures}
            />
          ) : (
            <Page
              className={"company-not-ready font-light"}
              style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
              shadow={false}
            >
              해당 기업은 인터뷰 준비 중입니다.
            </Page>
          )}

          {/* 방명록 */}
          <GuestComment />
        </div>
      </div>
    </>
  );
}
