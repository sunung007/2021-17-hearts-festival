import "./style.css";

import {useEffect, useState} from "react";

import CompanyContent from "./CompanyContent";
import GuestComment from "./GuestComment";

import Header from "../../components/Header";
import Page from "../../components/Page";
import DetailHeaderPage from "../../components/DetailHeaderPage";

import {useScrollToBody} from "../../hooks/useScrollToBody";
import {companyList} from "../../data/company";

export default function Company({history, match}) {
  const [body, scrollToBody] = useScrollToBody();
  const [intro, scrollToIntro] = useScrollToBody(56);
  const [interviewRef, scrollToInterview] = useScrollToBody(56);
  const [commentsRef, scrollToComments] = useScrollToBody(56);

  const [companyData, setCompanyData] = useState({});
  const [prevNext, setPrevNext] = useState([{}, {}]);

  const headerMenu = [
    ["기업소개", scrollToIntro],
    ["인터뷰", scrollToInterview],
    ["방명록", scrollToComments],
  ];

  useEffect(() => {
    const cid = parseInt(match.params.cid);
    const tmpCompany = companyList.filter((entry) => entry.id === cid);

    if (tmpCompany.length === 0) history.push("/error");
    const index = companyList.indexOf(tmpCompany[0]);

    setPrevNext([
      index > 0 ? companyList[index - 1] : {},
      index + 1 < companyList.length ? companyList[index + 1] : {},
    ]);
    setCompanyData(tmpCompany[0]);
  }, [history, match.params.cid]);

  return (
    <>
      <Header
        menu={headerMenu}
        showMenu={companyData.hasOwnProperty("id") && companyData.isReady}
      />

      <div className={"company"}>
        {/* 페이지 상단 헤더 */}
        <DetailHeaderPage
          title={companyData?.name}
          background={companyData?.banner}
          prev={prevNext[0]}
          next={prevNext[1]}
          scrollToBody={scrollToBody}
          baseURL={"/company"}
        />

        {/* 내용 */}
        <div className={"inner-padding"} ref={body}>
          {companyData.hasOwnProperty("id") && companyData.isReady ? (
            <CompanyContent
              company={companyData}
              introSection={intro}
              interviewSection={interviewRef}
            />
          ) : (
            <Page
              className={"company-not-ready"}
              style={{
                backgroundColor: "var(--color-dark-gray)",
                color: "white",
              }}
            >
              로딩 중입니다. 잠시만 기다려주세요.
              <br />
              해당 오류가 계속된다면 한양대학교 사회혁신센터(
              <a href="tel:02.2220.1004" title={"한양대 사회혁신센터 전화걸기"}>
                02.2220.1004
              </a>
              )로 연락바랍니다.
            </Page>
          )}

          {/* 방명록 */}
          <div style={{height: 0, padding: 0}} ref={commentsRef} />
          <GuestComment />
        </div>
      </div>
    </>
  );
}
