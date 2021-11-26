import "./style.css";

import {useEffect, useState} from "react";

import CompanyContent from "./CompanyContent";
import GuestComment from "./GuestComment";

import Header from "../../components/Header";
import Page from "../../components/Page";
import DetailHeaderPage from "../../components/DetailHeaderPage";

import {useScrollToBody} from "../../hooks/useScrollToBody";
import {getCompanyInterview} from "../../hooks/firebase";

import {banners} from "../../data/banner";
import {companyList} from "../../data/company";

export default function Company({history, match}) {
  const [body, scrollToBody] = useScrollToBody();
  const [intro, scrollToIntro] = useScrollToBody(56);
  const [interviewRef, scrollToInterview] = useScrollToBody(56);
  const [picturesRef, scrollToPictures] = useScrollToBody(56);
  const [commentsRef, scrollToComments] = useScrollToBody(56);

  const [companyData, setCompanyData] = useState({});
  const [prevNext, setPrevNext] = useState([{}, {}]);

  const headerMenu = [
    ["기업소개", scrollToIntro],
    ["인터뷰", scrollToInterview],
    ["갤러리", scrollToPictures],
    ["방명록", scrollToComments],
  ];

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
              tmpCompany[0].logoWhite ||
              require("../../assets/logos/seventeen-hearts.svg").default,
          });
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
        menu={headerMenu}
        showMenu={companyData.hasOwnProperty("id") && companyData.isReady}
      />

      <div className={"company"}>
        {/* 페이지 상단 헤더 */}
        <DetailHeaderPage
          title={companyData?.name}
          background={
            companyData?.banner ||
            banners.filter((r) => r.id === companyData?.id)[0]?.background
          }
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
              picturesSection={picturesRef}
            />
          ) : (
            <Page
              className={"company-not-ready font-light"}
              style={{
                backgroundColor: "var(--color-dark-gray)",
                color: "white",
              }}
            >
              해당 기업은 인터뷰 준비 중입니다.
              <br />
              해당 기업에 대해 궁금한 점이 있다면 방명록으로 알려주세요.
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
