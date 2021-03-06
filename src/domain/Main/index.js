import "./style.css";

import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {isIE} from "react-device-detect";

import Page from "../../components/Page";
import Modal from "../../components/Modal";
import {EventModal} from "../../components/Modal/EventModal";

import MainBanner from "./MainBanner";
import MainParticipant from "./MainParticipant";
import MainSublist from "./MainSublist";

import {useScrollToBody} from "../../hooks/useScrollToBody";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";

import {companyList} from "../../data/company";
import {clubs} from "../../data/clubs";

import mainTitle from "../../assets/backgrounds/main-banner-logo.svg";
import mainTitleMobile from "../../assets/backgrounds/main-banner-logo-mobile.svg";

import mainSection1 from "../../assets/backgrounds/main-section-interview.svg";
import mainSection2 from "../../assets/backgrounds/main-section-social-venture.svg";
import mainSection3 from "../../assets/backgrounds/main-section-hyu-sdgs.svg";

import mainBF1 from "../../assets/etc/intro.png";
import mainBF2 from "../../assets/etc/people-celebrity.jpg";
import mainBF3 from "../../assets/etc/people-normal.jpg";

export default function Main({visitor}) {
  const isBrowser = window.innerWidth > 700;

  const history = useHistory();

  const [section1, scrollToSection1] = useScrollToBody();
  const [section2, scrollToSection2] = useScrollToBody();

  const animation1 = useScrollFadeIn("up", 1, 0);
  const animation2 = useScrollFadeIn("up", 1, 0.3);
  const animation3 = useScrollFadeIn("up", 1, 0.6);

  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    const today = new Date();

    if (localStorage.getItem("event-modal") === "false") {
      const logDate = new Date(localStorage.getItem("event-modal-time"));
      if (logDate.getDate() === today.getDate()) setShowEventModal(false);
    } else setShowEventModal(true);
  }, []);

  useEffect(() => {
    if (!isIE && visitor === 2030) {
      history.push("/nth-visitor", {
        isNth: true,
      });
    }
  }, [history, visitor]);

  if (isIE) {
    return (
      <div className={"main"}>
        {/* ????????? ?????? ?????? */}
        <Page
          parentClassName={"main-banner-item-poster"}
          className={"page-header"}
        >
          <img
            className={"main-header-logo"}
            src={isBrowser ? mainTitle : mainTitleMobile}
            alt={""}
          />
        </Page>
        <div className={"inner-padding"}>
          <center>
            <p>Internet Exploere??? ?????????????????????.</p>
            <p>
              ??? ???????????? Chrome, Firefox, Safari, Edge ?????? ???????????????????????????.
            </p>
            <p style={{color: "#FF455E"}}>
              Internet Exploere??? ????????? ?????? ??????????????? ??????????????????.
            </p>
          </center>
        </div>
      </div>
    );
  } else
    return (
      <div className={"main"}>
        {/* ????????? ?????? ?????? */}
        <Page
          parentClassName={"main-banner-item-poster"}
          className={"page-header"}
        >
          <img
            className={"main-header-logo"}
            src={isBrowser ? mainTitle : mainTitleMobile}
            alt={""}
          />
        </Page>

        <div className={"inner-padding"}>
          {/* seventeen hearts festival ?????? */}
          <Page
            parentClassName={"main-intro-page"}
            style={{backgroundColor: "var(--color-main-banner)"}}
          >
            <div className={"main-intro-content"}>
              <div className={"text"}>
                <p>
                  ??????????????? ?????????????????????
                  <br />
                  ??????????????? ??????????????? ?????? ???????????? ????????? ???????????? ???????????????
                  ????????????
                  <br />
                  2016????????? ???????????? ??????????????? ??????{" "}
                  <b>Seventeen Hearts Festival</b>??? ??????????????? ????????????.
                </p>
                <br />
                <p>
                  Seventeen Hearts Festival???
                  <br />
                  UN-SDGs(????????????????????????) 17?????? ???????????? ??????,
                  <br />
                  ???????????? ????????????????????? ????????? ????????? ????????????, ?????????
                  ????????????
                  <br />
                  ??????????????? ????????? ????????? ????????? ?????? ????????????.
                </p>
                <br />
                <p>
                  6????????? ?????? 2021??? Seventeen Hearts Festival?????????
                  <br />
                  ESG?????? ????????? ????????? ????????????
                  <br />
                  <b>
                    ?????? ????????????/???????????? ????????? ?????? ESG??? ??????????????? ??????
                    ?????? ??? ????????? ???????????? ???????????? ??????
                  </b>
                  ??????
                  <br />
                  <b>
                    ???????????? ???????????? ???????????? ?????? ????????? ???????????? ????????????
                    ????????????/???????????? ?????? ?????? ????????? ??????
                  </b>
                  ??????
                  <br />
                  ????????? ?????????????????????.
                </p>
              </div>
            </div>
            <br />

            <ul className={"main-intro-subsection"}>
              <li
                className={"main-intro-subsection-item"}
                onClick={scrollToSection1}
                {...animation1}
              >
                <div className={"title"}>?????? ?????????</div>
                <div className={"main-intro-subsection-move-btn"}>????????????</div>
                <img src={mainSection1} alt={""} />
              </li>

              <li
                className={"main-intro-subsection-item"}
                onClick={scrollToSection2}
                {...animation2}
              >
                <div className={"title"}>????????????</div>
                <div className={"main-intro-subsection-move-btn"}>????????????</div>
                <img src={mainSection2} alt={""} />
              </li>

              <li
                className={"main-intro-subsection-item"}
                onClick={() => {
                  window.open(
                    "http://hvc.hanyang.ac.kr/hyu-??????????????????/hyu-social-innovation/hyu-sdgs-?????????-??????/"
                  );
                }}
                {...animation3}
              >
                <div className={"title"}>????????? SDGs</div>
                <div className={"main-intro-subsection-move-btn"}>????????????</div>
                <img src={mainSection3} alt={""} />
              </li>
            </ul>
          </Page>

          {/* ?????? ????????? */}
          <div style={{height: 0, padding: 0}} ref={section1} />
          <Page parentClassName={"home-company-list-page"}>
            <h1 className={"section-title"}>
              <div>??????/?????? ?????????</div>
              <div className={"subtitle"}>Interview to Companies</div>
            </h1>
            <br />

            {/* ?????? */}
            <MainBanner />

            <ul className={"home-sublist-list home-company-list"}>
              {companyList.map((company, index) => (
                <MainSublist
                  info={company}
                  key={index}
                  index={index}
                  link={`/company/${company.id}`}
                />
              ))}
            </ul>
          </Page>

          {/* ???????????? ????????? */}
          <div style={{height: 0, padding: 0}} ref={section2} />
          <Page parentClassName={"home-club-list-page"}>
            <h1 className={"section-title"}>
              <div>????????????</div>
              <div className={"subtitle"}>Social Venture</div>
            </h1>
            <br />

            <ul className={"home-sublist-list home-club-list"}>
              {clubs.map((club, index) => (
                <MainSublist
                  info={club}
                  key={index}
                  index={index}
                  link={`/club/${club.id}`}
                />
              ))}
            </ul>
          </Page>

          {/* ??????????????? */}
          <Page
            parentClassName={"home-bf-info-page"}
            style={{backgroundColor: "var(--color-light-blue3)"}}
          >
            <h1 className={"section-title"}>
              <div>??????????????? ??????</div>
              <div className={"subtitle"}>Barrier-Free Movie</div>
            </h1>
            <br />

            <div className={"section"}>
              <div className={"bg"}>
                <p>
                  ??????????????????, '?????? ?????? ????????????(BARRIER FREE DESIGN)'??? ??????
                  ??????????????? ????????? ??????, <b>??????????????? ?????????</b> ????????? ???
                  ?????? ????????? ????????? ?????? ?????????/????????? ????????? ????????????
                  ???????????????.
                  <br />
                  ??????????????? ?????? ???????????? ?????? ?????? ????????? ????????? ?????? ?????????
                  ???????????? ???????????? ?????? ???????????? ???????????? ????????????.
                </p>
                <br />

                <p>
                  <b>?????????????????????</b>??? "????????? ????????? ????????? ???????????????{" "}
                  <b>????????????</b>??? ?????? ??? ??????, ??????, ??????????????? ????????????{" "}
                  <b>?????????????????????</b>??? ??????{" "}
                  <b>?????? ????????? ?????? ?????? ??? ????????? ?????? ??????</b>"?????????.
                </p>
                <br />

                <p>
                  ?????? ????????? "????????????"??? ?????? ?????????. ????????? ????????????
                  ??????????????? ????????? ?????? ????????? ??????????????? ??????????????? ?????????
                  ???????????? ????????? ????????? ???????????? <b>???????????????????????? ??????</b>
                  ?????????. ?????? ?????? ????????? ????????? ???????????? ?????? ??? ?????? ?????? ???
                  ?????? ???????????????.
                </p>
                <br />

                <p>???????????????????????? ?????? ??? ?????? ????????? ????????? ??????????????????.</p>
                <a
                  href={"http://barrierfreefilms.or.kr/main"}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  ?????????????????????????????? ????????????
                </a>
              </div>

              <div>
                <img src={mainBF1} alt={"????????????????????? ??????"} />
                <br />
                <i>
                  ???????????? ????????? ??? (?????? : ????????? CJ ENM Movie ???????????? 2???
                  ?????????)
                </i>
              </div>
            </div>

            <div className={"section"}>
              <div>
                <img src={mainBF2} alt={"??????????????? ????????? ????????????"} />
                <br />
                <img src={mainBF3} alt={"??????????????? ????????? ????????????"} />
                <br />
                <i>????????????????????? ???????????? (?????? : ??????????????????????????????)</i>
              </div>
              <div className={"bg"}>
                <p>
                  2022 ????????????????????? ??????????????? &lt;???????????? ?????????&gt;,
                  &lt;?????????&gt;??? ????????? ??????, &lt;????????? ??????&gt;,
                  &lt;????????????&gt;??? ????????? ??????, &lt;????????? ??????
                  ??????&gt;,&lt;?????????&gt;??? ????????? ????????? ?????????????????????.
                </p>
                <p>
                  <br />
                  2022 ????????????????????? ?????? ?????????????????? ??????????????? ?????????,
                  ??????????????? ?????????, ????????? ????????????{" "}
                  <b>??????????????? '????????????'?????? ?????????, ?????????, ?????????</b> ??? ???
                  5?????? ?????????????????????.
                </p>
                <br />
                <a
                  href={"https://www.youtube.com/user/BarrierFreeFrilms"}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  2022 ????????????????????? ???????????? ????????? ??????
                </a>
                <br />
                <br />

                <p>
                  ???????????? ?????? ????????? ??????????????? ????????? ?????? ????????? ??????
                  ????????????, ????????? ??? ???????????? ????????? ?????? ???????????? ??????,
                  ???????????? ???????????? ????????????. ???????????? ?????? ?????????????????????
                  ???????????? ?????? ??? MD ????????? ?????? ????????????????????? ?????? ?????????
                  ?????? SK LOOKIE ????????? ?????? ????????????.
                </p>
                <br />

                <p>???????????? ?????? ?????? ??? ?????? ????????? ????????? ??????????????????.</p>
                <Link to={"/club/1"}>???????????????, '????????????'????</Link>
              </div>
            </div>
          </Page>

          {/* ????????? ????????? */}
          <MainParticipant />

          {/* ????????? ????????? */}
          {showEventModal && (
            <Modal background={"rgba(0, 0, 0, 0.3)"} style={{zIndex: "140"}}>
              <EventModal setShow={setShowEventModal} />
            </Modal>
          )}
        </div>
      </div>
    );
}
