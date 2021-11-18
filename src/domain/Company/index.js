import "./style.css";

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import CompanyContent from "./CompanyContent";
import GuestComment from "./GuestComment";
import Header from "../../components/Header";
import Page from "../../components/Page";

import {BACKGROUND_COLOR_GRAY} from "../../hooks/common";
import {useScrollToBody} from "../../hooks/useScrollToBody";

import {banners} from "../../data/banner";
import {companyList} from "../../data/company";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronLeft,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {getCompanyInterview} from "../../hooks/firebase";

export default function Company({history, match}) {
  const [body, scrollToBody] = useScrollToBody();
  const [intro, scrollToIntro] = useScrollToBody(56);
  const [interviewRef, scrollToInterview] = useScrollToBody(56);
  const [picturesRef, scrollToPictures] = useScrollToBody(56);
  const [commentsRef, scrollToComments] = useScrollToBody(56);

  const [companyData, setCompanyData] = useState({});
  const [prevNext, setPrevNext] = useState([{}, {}]);

  useEffect(() => {
    const cid = parseInt(match.params.cid);
    const tmpCompany = companyList.filter((entry) => entry.id === cid);

    if (tmpCompany.length === 0) history.push("/error");
    else {
      const index = companyList.indexOf(tmpCompany[0]);
      setPrevNext([
        index > 0 ? companyList[index - 1] : {},
        index + 1 < companyList.length ? companyList[index + 1] : {},
      ]);
      setCompanyData(tmpCompany[0]);

      getCompanyInterview(cid)
        .then((r) => {
          setCompanyData({
            ...r,
            logo:
              tmpCompany[0].logo ||
              require("../../assets/logos/seventeen-hearts.png").default,
          });
          console.log(r);
        })
        .catch((e) => {
          console.error("기업 정보 읽기에 실패하였습니다.");
          console.error(e);
        });
    }
  }, [history, match.params.cid]);

  return (
    <>
      <Header
        scrollToIntro={scrollToIntro}
        scrollToInterview={scrollToInterview}
        scrollToPictures={scrollToPictures}
        scrollToComments={scrollToComments}
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
                <span>Seventeen Hearts Festiver</span>
              </Link>
            </div>

            <div className={"title"}>{companyData?.name}</div>
          </div>

          <div className={"company-banner-background"}>
            <img
              src={
                companyData?.banner ||
                banners.filter((r) => r.id === companyData?.id)[0]
                  ?.background ||
                require("../../assets/banners/default.png").default
              }
              alt={""}
            />
          </div>

          <div className={"page-header-down-float"}>
            <Link
              to={`/company/${prevNext[0]?.id}`}
              className={"go-sibling font-light"}
              style={
                !prevNext[0].hasOwnProperty("id") ? {visibility: "hidden"} : {}
              }
            >
              {"< " + prevNext[0]?.name}
            </Link>

            <div>
              {/* 홈으로 가는 버튼 */}
              <button>
                <Link to={"/"}>
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </button>

              {/* 아래로 내려가는 버튼 */}
              <button onClick={scrollToBody}>
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </div>

            <Link
              to={`/company/${prevNext[1]?.id}`}
              className={"go-sibling font-light"}
              style={
                !prevNext[1].hasOwnProperty("id") ? {visibility: "hidden"} : {}
              }
            >
              {prevNext[1]?.name + " >"}
            </Link>
          </div>
        </Page>

        {/* 내용 */}
        <div className={"inner-padding"} ref={body}>
          {companyData.hasOwnProperty("id") && companyData.isReady ? (
            <CompanyContent
              company={companyData}
              introSection={intro}
              interviewSection={interviewRef}
              picturesSection={picturesRef}
            />
          ) : (
            <Page
              className={"company-not-ready font-light"}
              style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
            >
              해당 기업은 인터뷰 준비 중입니다.
            </Page>
          )}

          {/* 방명록 */}
          <div style={{height: 0, padding: 0}} ref={commentsRef} />
          <GuestComment cid={companyData?.id} />
        </div>
      </div>
    </>
  );
}
