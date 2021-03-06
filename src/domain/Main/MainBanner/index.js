import "./style.css";

import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Page from "../../../components/Page";
import {companyList} from "../../../data/company";

import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {faPauseCircle} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getCompanyOnelines} from "../../../hooks/firebase";

export default function MainBanner() {
  const totalBanner = companyList.length;

  const [companyOnelines, setCompanyOnelines] = useState({});
  const [curBanner, setCurBanner] = useState(0);
  const [isStop, setIsStop] = useState(false);

  const changeBannerToLeft = () =>
    setCurBanner(
      curBanner < 1 ? totalBanner - 1 : (curBanner - 1) % totalBanner
    );
  const changeBannerToRight = useCallback(() => {
    setCurBanner((curBanner + 1) % totalBanner);
  }, [curBanner, totalBanner]);

  useEffect(() => {
    getCompanyOnelines()
      .then((r) => {
        if (r !== undefined) setCompanyOnelines(r);
      })
      .catch((e) => {
        console.error("기업별 소개 문구 로딩에 실패하였습니다.");
        console.error(e);
      });
  }, []);

  useEffect(() => {
    const tick = setTimeout(() => !isStop && changeBannerToRight(), 3000);
    return () => clearTimeout(tick);
  }, [changeBannerToRight, isStop]);

  return (
    <div className={"main-banner"}>
      <ul
        className={"main-banner-wrapper"}
        style={{
          marginLeft: `${(window.innerWidth - 610) / 2 - 590 * curBanner}px`,
        }}
      >
        {companyList.map((company, index) => (
          <li
            className={`main-banner-item ${
              index === curBanner && "main-banenr-item-current"
            }`}
            key={index}
          >
            <Page className={"page-header"}>
              <div className={"page-header-content"}>
                <div className={"page-title"}>
                  <div className={"subtitle"}>
                    {companyOnelines[company.id]}
                  </div>
                  <div className={"title"}>{company?.name}</div>

                  {/* 인터뷰 보기 버튼 */}
                  <button
                    className={"main-banner-btn font-light"}
                    onMouseOver={() => setIsStop(true)}
                    onMouseLeave={() => setIsStop(false)}
                  >
                    <Link to={`/company/${company.id}`}>인터뷰 보기</Link>
                  </button>
                </div>

                <div className={"main-banner-logo"}>
                  <img
                    src={
                      companyList.filter((c) => c.id === company.id)[0]
                        ?.logoWhite
                    }
                    alt={""}
                  />
                </div>
              </div>

              <div className={"main-banner-background"}>
                <img src={company?.banner} alt={""} />
              </div>
            </Page>
          </li>
        ))}
      </ul>

      {/* 배너 전환 화살표 */}
      <div className={"main-banner-change-btn"}>
        <span onClick={changeBannerToLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span onClick={changeBannerToRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>

      <div className={"page-header-down-float"}>
        {/* 배너 전환 일시정지 */}
        <div
          className={"pause-alert"}
          style={isStop ? {opacity: "1"} : {opacity: "0"}}
        >
          <FontAwesomeIcon icon={faPauseCircle} />
        </div>

        {/* 배너 전환 점 */}
        <ul
          className={"banner-list-circle"}
          onMouseOver={() => setIsStop(true)}
          onMouseLeave={() => setIsStop(false)}
        >
          {Array.from({length: totalBanner}, (v, i) => i).map((a, index) => (
            <li
              key={index}
              className={
                index === curBanner ? "banner-list-circle-current" : undefined
              }
              onClick={() => setCurBanner(index)}
            >
              <FontAwesomeIcon icon={faCircle} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
