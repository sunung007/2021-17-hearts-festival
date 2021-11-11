import "./style.css";

import {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router";

import Page from "../../../components/Page";
import titleBackground from "../../../assets/title-background.svg";

import {banners} from "../../../data/banner";
import {companyList} from "../../../data/company";

import {
  faArrowDown,
  faChevronLeft,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MainBanner({scrollToBody}) {
  const totalBanner = banners.length + 1;
  const history = useHistory();
  const [curBanner, setCurBanner] = useState(0);

  const changeBannerToLeft = () =>
    setCurBanner(
      curBanner < 1 ? totalBanner - 1 : (curBanner - 1) % totalBanner
    );
  const changeBannerToRight = useCallback(() => {
    setCurBanner((curBanner + 1) % totalBanner);
  }, [curBanner, totalBanner]);

  const bannerBtnClick = (e) => history.push(`/company/${e.target.id}`);

  useEffect(() => {
    const tick = setTimeout(changeBannerToRight, 2700);
    return () => clearTimeout(tick);
  }, [changeBannerToRight, curBanner]);

  return (
    <div className={"main-banner"}>
      <ul
        className={"main-banner-wrapper"}
        style={{marginLeft: `-${curBanner * 100}vw`}}
      >
        <li className={"main-banner-item-poster"}>
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
              <h4 className={"subtitle"}>
                사랑의 실천으로 세상과 사람을 바꾸는 한양의 사회혁신축제에
                여러분을 초대합니다.
              </h4>
            </div>
          </Page>
        </li>

        {banners.map((banner, index) => (
          <li className={"main-banner-item"} key={index}>
            <Page className={"page-header"}>
              <div className={"page-header-content"}>
                <div className={"page-title"}>
                  <div className={"subtitle"}>{banner.subtitle}</div>
                  <div className={"title"}>{banner.title}</div>
                  <button
                    className={"main-banner-btn font-light"}
                    onClick={bannerBtnClick}
                    id={banner.id}
                  >
                    인터뷰 바로가기
                  </button>
                </div>

                <div className={"main-banner-logo"}>
                  <img
                    src={companyList.filter((c) => c.id === banner.id)[0].logo}
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
        {/* 배너 전환 점 */}
        <ul className={"banner-list-circle"}>
          {Array.from({length: totalBanner}, (v, i) => i).map((a, index) => (
            <li
              key={index}
              className={index === curBanner && "banner-list-circle-current"}
              onClick={() => setCurBanner(index)}
            >
              <FontAwesomeIcon icon={faCircle} />
            </li>
          ))}
        </ul>

        {/* 아래로 내려가는 버튼 */}
        <button onClick={scrollToBody}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
  );
}
