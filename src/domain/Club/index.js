import "./style.css";
import {useEffect, useState} from "react";
import {clubs} from "../../data/clubs";
import {useScrollToBody} from "../../hooks/useScrollToBody";
import DetailHeaderPage from "../../components/DetailHeaderPage/index";
import Page from "../../components/Page";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

const ClubContent = ({club}) => {
  return (
    <>
      <Page style={{backgroundColor: "var(--color-dark-blue)", color: "white"}}>
        <center className={"font-light"}>
          <FontAwesomeIcon icon={faExclamationTriangle} /> 본 페이지는 웹에
          최적화 되어 있습니다.
        </center>
        <br />
        <img
          src={club?.poster}
          alt={""}
          style={{width: "auto", height: "auto", maxWidth: "100%"}}
        />
      </Page>
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <img
          src={club?.logo}
          alt={""}
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "min(100%, 200px)",
            maxHeight: "400px",
          }}
        />
      </div>
    </>
  );
};

export default function Club({history, match}) {
  const [body, scrollToBody] = useScrollToBody();

  const [clubData, setClubData] = useState({});
  const [prevNext, setPrevNext] = useState([{}, {}]);

  useEffect(() => {
    const cid = parseInt(match.params.cid);
    const tmpClub = clubs.filter((entry) => entry.id === cid);

    if (tmpClub.length === 0) history.push("/error");
    else {
      const index = clubs.indexOf(tmpClub[0]);
      setClubData(tmpClub[0]);
      setPrevNext([
        index > 0 ? clubs[index - 1] : {},
        index + 1 < clubs.length ? clubs[index + 1] : {},
      ]);
    }
  }, [history, match.params.cid]);

  return (
    <div className={"club"}>
      {/* 페이지 상단 헤더 */}
      <DetailHeaderPage
        title={clubData?.name}
        background={clubData?.banner}
        prev={prevNext[0]}
        next={prevNext[1]}
        scrollToBody={scrollToBody}
        baseURL={"/club"}
      />

      {/* 내용 */}
      <div className={"inner-padding"} ref={body}>
        {clubData.hasOwnProperty("id") && <ClubContent club={clubData} />}
      </div>
    </div>
  );
}
