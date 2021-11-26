import "./style.css";

import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Page from "../../../components/Page";
import {banners} from "../../../data/banner";
import {companyList} from "../../../data/company";

import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {faPauseCircle} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MainBanner() {
  const totalBanner = banners.length;
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
        {banners.map((banner, index) => (
          <li
            className={`main-banner-item ${
              index === curBanner && "main-banenr-item-current"
            }`}
            key={index}
          >
            <Page className={"page-header"}>
              <div className={"page-header-content"}>
                <div className={"page-title"}>
                  <div className={"subtitle"}>{banner.subtitle}</div>
                  <div className={"title"}>{banner.title}</div>

                  {/* 인터뷰 보기 버튼 */}
                  <button
                    className={"main-banner-btn font-light"}
                    onMouseOver={() => setIsStop(true)}
                    onMouseLeave={() => setIsStop(false)}
                  >
                    <Link to={`/company/${banner.id}`}>인터뷰 보기</Link>
                  </button>
                </div>

                <div className={"main-banner-logo"}>
                  <img
                    src={companyList.filter((c) => c.id === banner.id)[0]?.logo}
                    alt={""}
                  />
                </div>
              </div>

              <div className={"main-banner-background"}>
                <img src={banner.background} alt={""} />
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
