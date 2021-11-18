import "./style.css";
import Page from "../../components/Page/index";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";

export default function Club({history, match}) {
  useEffect(() => {
    const cid = parseInt(match.params.cid);
    // const tmpCompany = companyList.filter((entry) => entry.id === cid);

    // if (tmpCompany.length === 0) history.push("/error");
    // else {
    //   const index = companyList.indexOf(tmpCompany[0]);
    //   setCompanyData(tmpCompany[0]);
    //   setPrevNext([
    //     index > 0 ? companyList[index - 1] : {},
    //     index + 1 < companyList.length ? companyList[index + 1] : {},
    //   ]);
    // }
  }, [history, match.params.cid]);

  return (
    <div>
      {/* 페이지 상단 헤더 */}
      <Page className={"page-header"}>
        <div className={"page-title"}>
          <div className={"subtitle"}>
            <Link to={"/"}>
              <span className={"page-title-go-back-home-arrow"}>
                <FontAwesomeIcon icon={faChevronLeft} />{" "}
              </span>
              <span>17 Hearts Festiver</span>
            </Link>
          </div>

          {/* <div className={"title"}>{companyData?.name}</div>
          </div>

          <div className={"company-banner-background"}>
            <img
              src={
                banners.filter((r) => r.id === companyData?.id)[0]
                  ?.background ||
                require("../../assets/banners/default.png").default
              }
              alt={""}
            /> */}
        </div>
      </Page>
    </div>
  );
}
