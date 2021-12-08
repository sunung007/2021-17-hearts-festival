import "./style.css";

import {useEffect} from "react";
import {useHistory, useLocation} from "react-router";

import VisitorComment from "./VisitorComment";

import Page from "../../components/Page";
import mainTitle from "../../assets/backgrounds/main-banner-logo.svg";
import mainTitleMobile from "../../assets/backgrounds/main-banner-logo-mobile.svg";

export default function NthVisitor() {
  const isBrowser = window.innerWidth > 700;

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const isNth = location?.state?.isNth;
    if (!(typeof isNth === "boolean" && isNth)) {
      history.replace("/error");
    }
  }, [history, location?.state?.isNth]);

  return (
    <div className={"nth-visitor"}>
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
      <div
        className={"inner-padding"}
        style={{
          backgroundColor: "var(--color-main-banner)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Page>
          <div>
            <p>안녕하세요. 한양대학교 사회혁신센터입니다.</p>
            <br />
            <h2 style={{lineHeight: "1.5em"}}>
              6번째 Seventeen Hearts Festival 페이지의
              <br />
              2030번째 방문자가 되어주셔서 감사합니다.
            </h2>
            <br />
            <p>
              UN에서는 2030년까지 17개의 항목을 지속가능발전의 이념을 실현하기
              위해 인류 공동의 목표를 세웠습니다.
              <br />
              '2030 지속가능발전 의제'라고도 하는 지속가능발전목표(SDGs)는 '단
              한 사람도 소외되지 않는 것(Leave no one behind)'이라는 슬로건과
              함께
              <br />
              인간, 지구, 번영, 평화, 파트너십이라는 5개 영역에서 인류가
              나아가야 할 방향성을 17개 목표와 169개 세부 목표로 제시하고
              있습니다.
            </p>
            <br />
            <p>
              Seventeen Hearts Festival은 UN-SDGs(지속가능발전목표) 17개를
              모티브로 하여,
              <br />
              사회혁신 선도대학이라는 브랜드 확립과 지역사회, 대학이 함께하는
              지속가능한 임팩트 창출을 목표로 하고 있습니다.
            </p>
            <br />
            <p>
              6번째를 맞는 2021년 Seventeen Hearts Festival에서는 ESG라는 사회적
              이슈를 중심으로
              <br />
              <b>
                국내 우수기관/기업에서 가지고 있는 ESG와 사회공헌에 대한 방향 및
                목표를 확인하는 인터뷰를 진행
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
            <br />
            <p>부디 마음껏 즐겨주시기 바랍니다.</p>
          </div>
          <br />

          <div>
            <div>
              경품 제공을 위해 아래 정보를 입력하여 주시기 바랍니다.
              <br />
              입력하신 개인정보는 경품 제공을 위해서만 사용되며, 행사 종료 후
              1년의 보관기간 이후 파기됨을 알려드립니다.
              <br />
              제출버튼을 누르시는 것은 위 사항에 대해 동의함으로 간주합니다.
            </div>
          </div>

          <div>
            <VisitorComment />
          </div>
        </Page>
      </div>
    </div>
  );
}
