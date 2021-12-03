import "./style.css";

import {Link} from "react-router-dom";
import {isIE} from "react-device-detect";

import Page from "../../components/Page";
import mainTitle from "../../assets/backgrounds/main-banner-logo.svg";
import mainTitleMobile from "../../assets/backgrounds/main-banner-logo-mobile.svg";

import MainBanner from "./MainBanner";
import MainParticipant from "./MainParticipant";
import MainSublist from "./MainSublist";

import {companyList} from "../../data/company";
import {clubs} from "../../data/clubs";
import {useScrollToBody} from "../../hooks/useScrollToBody";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";

export default function Main() {
  const isBrowser = window.innerWidth > 700;

  const [section1, scrollToSection1] = useScrollToBody();
  const [section2, scrollToSection2] = useScrollToBody();

  const animation1 = useScrollFadeIn("up", 1, 0);
  const animation2 = useScrollFadeIn("up", 1, 0.3);
  const animation3 = useScrollFadeIn("up", 1, 0.6);

  if (isIE) {
    return (
      <div className={"main"}>
        {/* 페이지 상단 헤더 */}
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
            <p>Internet Exploere로 접근하셨습니다.</p>
            <p>
              본 사이트는 Chrome, Firefox, Safari, Edge 등에 최적화되어있습니다.
            </p>
            <p style={{color: "#FF455E"}}>
              Internet Exploere를 제외한 다른 브라우저로 접근바랍니다.
            </p>
          </center>
        </div>
      </div>
    );
  } else
    return (
      <div className={"main"}>
        {/* 페이지 상단 헤더 */}
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
          {/* seventeen hearts festival 소개 */}
          <Page
            parentClassName={"main-intro-page"}
            style={{backgroundColor: "var(--color-main-banner)"}}
          >
            <div className={"main-intro-content"}>
              <div className={"text"}>
                <p>
                  한양대학교 사회혁신센터는
                  <br />
                  대학생들의 사회혁신에 대한 이해도를 높이고 주도적인 활동참여를
                  목적으로
                  <br />
                  2016년부터 사회혁신 성과공유의 장인{" "}
                  <b>Seventeen Hearts Festival</b>을 개최해오고 있습니다.
                </p>
                <br />
                <p>
                  Seventeen Hearts Festival은
                  <br />
                  UN-SDGs(지속가능발전목표) 17개를 모티브로 하여,
                  <br />
                  사회혁신 선도대학이라는 브랜드 확립과 지역사회, 대학이
                  함께하는
                  <br />
                  지속가능한 임팩트 창출을 목표로 하고 있습니다.
                </p>
                <br />
                <p>
                  6번째를 맞는 2021년 Seventeen Hearts Festival에서는
                  <br />
                  ESG라는 사회적 이슈를 중심으로
                  <br />
                  <b>
                    국내 우수기관/기업에서 가지고 있는 ESG와 사회공헌에 대한
                    방향 및 목표를 확인하는 인터뷰를 진행
                  </b>
                  하고
                  <br />
                  <b>
                    교내에서 활발하게 활동하고 있는 재학생 소셜벤처 창업팀과
                    사회혁신/사회공헌 활동 팀의 성과를 공유
                  </b>
                  하는
                  <br />
                  자리를 마련하였습니다.
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
                <div className={"title"}>기업 인터뷰</div>
                <div className={"main-intro-subsection-move-btn"}>바로가기</div>
                <img
                  src={
                    require("../../assets/backgrounds/main-section-interview.svg")
                      .default
                  }
                  alt={""}
                />
              </li>

              <li
                className={"main-intro-subsection-item"}
                onClick={scrollToSection2}
                {...animation2}
              >
                <div className={"title"}>소셜벤처</div>
                <div className={"main-intro-subsection-move-btn"}>바로가기</div>
                <img
                  src={
                    require("../../assets/backgrounds/main-section-social-venture.svg")
                      .default
                  }
                  alt={""}
                />
              </li>

              <li
                className={"main-intro-subsection-item"}
                onClick={() => {
                  window.open(
                    "http://hvc.hanyang.ac.kr/hyu-사회혁신센터/hyu-social-innovation/hyu-sdgs-선언과-행동/"
                  );
                }}
                {...animation3}
              >
                <div className={"title"}>한양의 SDGs</div>
                <div className={"main-intro-subsection-move-btn"}>바로가기</div>
                <img
                  src={
                    require("../../assets/backgrounds/main-section-hyu-sdgs.svg")
                      .default
                  }
                  alt={""}
                />
              </li>
            </ul>
          </Page>

          {/* 기업 리스트 */}
          <div style={{height: 0, padding: 0}} ref={section1} />
          <Page parentClassName={"home-company-list-page"}>
            <h1 className={"section-title"}>
              <div>기업/기관 인터뷰</div>
              <div className={"subtitle"}>Interview to Companies</div>
            </h1>
            <br />

            {/* 배너 */}
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

          {/* 소셜벤처 리스트 */}
          <div style={{height: 0, padding: 0}} ref={section2} />
          <Page parentClassName={"home-club-list-page"}>
            <h1 className={"section-title"}>
              <div>소셜벤쳐</div>
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

          {/* 배리어프리 */}
          <Page
            parentClassName={"home-bf-info-page"}
            style={{backgroundColor: "var(--color-light-blue3)"}}
          >
            <h1 className={"section-title"}>
              <div>배리어프리 영화</div>
              <div className={"subtitle"}>Barrier-Free Movie</div>
            </h1>
            <br />

            <div className={"section"}>
              <div className={"bg"}>
                <p>
                  배리어프리란, '장벽 없는 건축설계(BARRIER FREE DESIGN)'에 관한
                  보고서에서 유래한 말로, <b>장애인들도 편하게</b> 살아갈 수
                  있는 도시를 만들기 위해 물리적/제도적 장벽을 허물자는
                  개념입니다.
                  <br />
                  오늘날에는 건축 시설물의 변화 뿐만 아니라 문화와 예술 분야로
                  적용되고 확장되어 모든 분야에서 사용되고 있습니다.
                </p>
                <br />

                <p>
                  <b>배리어프리영화</b>란 "기존의 영화에 화면을 설명해주는{" "}
                  <b>음성해설</b>과 화자 및 대사, 음악, 소리정보를 알려주는{" "}
                  <b>배리어프리자막</b>을 넣어{" "}
                  <b>모든 사람이 함께 즐길 수 있도록 만든 영화</b>"입니다.
                </p>
                <br />

                <p>
                  다음 영화는 "극한직업"의 일부 입니다. 왼쪽과 비교해서
                  오른쪽에는 기존의 영화 화면을 설명해주는 음성해설과 더불어
                  전화벨이 울리고 있음을 알려주는 <b>배리어프리자막이 존재</b>
                  합니다. 이로 인해 신체적 제약이 덜해져서 조금 더 함께 즐길 수
                  있게 되었습니다.
                </p>
                <br />

                <p>배리어프리영화에 대한 더 많은 내용은 아래를 참고해주세요.</p>
                <a
                  href={"http://barrierfreefilms.or.kr/main"}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  배리어프리영화위원회 바로가기
                </a>
              </div>

              <div>
                <img
                  src={require("../../assets/etc/intro.png").default}
                  alt={"배리어프리영화 안내"}
                />
                <br />
                <i>
                  극한직업 예고편 중 (출처 : 유튜브 CJ ENM Movie 극한직업 2차
                  예고편)
                </i>
              </div>
            </div>

            <div className={"section"}>
              <div>
                <img
                  src={require("../../assets/etc/people-celebrity.jpg").default}
                  alt={"배리어프리 연예인 홍보대사"}
                />
                <br />
                <img
                  src={require("../../assets/etc/people-normal.jpg").default}
                  alt={"배리어프리 일반인 홍보대사"}
                />
                <br />
                <i>배리어프리영화 홍보대사 (출처 : 서울배리어프리영화제)</i>
              </div>
              <div className={"bg"}>
                <p>
                  2022 배리어프리영화 홍보대사로 &lt;조선로코 녹두전&gt;,
                  &lt;태일이&gt;의 장동윤 배우, &lt;스카이 캐슬&gt;,
                  &lt;괴기맨숀&gt;의 김보라 배우, &lt;마당을 나온
                  암탉&gt;,&lt;언더독&gt;의 오성윤 감독이 위촉되었습니다.
                </p>
                <p>
                  <br />
                  2022 배리어프리영화 관객 홍보대사로는 시각장애인 박현선,
                  청각장애인 이정하, 비장애 홍보대사{" "}
                  <b>한양대학교 '같이걷개'팀의 최정윤, 공주현, 김세인</b> 등 총
                  5인이 위촉되었습니다.
                </p>
                <br />
                <a
                  href={"https://www.youtube.com/user/BarrierFreeFrilms"}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  2022 배리어프리영화 홍보대사 위촉식 보기
                </a>
                <br />
                <br />

                <p>
                  같이걷개 팀은 장애인 도우미견의 확산과 인식 개선을 위해
                  노력하고, 장애인 및 교통약자 이동권 증진 서비스를 기획,
                  운영하는 사회혁신 팀입니다. 같이걷개 팀은 장애인도우미견
                  뉴스레터 발송 및 MD 제작을 통한 장애인도우미견 육성 사업을
                  돕는 SK LOOKIE 활동도 진행 중입니다.
                </p>
                <br />

                <p>같이걷개 팀에 대한 더 많은 내용은 아래를 참고해주세요.</p>
                <Link to={"/club/1"}>사회혁신팀, '같이걷개'란?</Link>
              </div>
            </div>
          </Page>

          {/* 함께한 사람들 */}
          <MainParticipant />
        </div>
      </div>
    );
}
