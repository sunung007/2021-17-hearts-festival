import "./style.css";
import {useEffect, useState} from "react";
import {clubs} from "../../data/clubs";
import {useScrollToBody} from "../../hooks/useScrollToBody";
import DetailHeaderPage from "../../components/DetailHeaderPage/index";

export default function Club({history, match}) {
  const [body, scrollToBody] = useScrollToBody();

  const [clubData, setClubData] = useState({});
  const [prevNext, setPrevNext] = useState([{}, {}]);

  useEffect(() => {
    const cid = parseInt(match.params.cid);
    const tmpCompany = clubs.filter((entry) => entry.id === cid);

    if (tmpCompany.length === 0) history.push("/error");
    else {
      const index = clubs.indexOf(tmpCompany[0]);
      setClubData(tmpCompany[0]);
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
        {clubData.hasOwnProperty("id") && clubData.isReady && <></>}
      </div>
    </div>
  );
}
