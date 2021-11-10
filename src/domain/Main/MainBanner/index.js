import "./style.css";
import titleBackground from "../../../assets/title-background.svg";

import {
  faArrowDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Page from "../../../components/Page";
import {banners} from "../../../data/banner";
import {useState} from "react";
import {useHistory} from "react-router";
import {companyList} from "../../../data/company";

export default function MainBanner({scrollToBody}) {
  const totalBanner = banners.length + 1;
  const history = useHistory();
  const [curBanner, setCurBanner] = useState(0);

  const changeBannerToLeft = () => {
    setCurBanner(
      curBanner < 1 ? totalBanner - 1 : (curBanner - 1) % totalBanner
    );
  };
  const changeBannerToRight = () => {
    setCurBanner((curBanner + 1) % totalBanner);
  };

  const bannerBtnClick = (e) => {
    history.push(`/company/${e.target.id}`);
  };

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
              <h4 className={"page-header-intro subtitle"}>
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

      {/* 아래로 내려가는 버튼 */}
      <div className={"page-header-down-float"}>
        <button onClick={scrollToBody}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
  );
}
