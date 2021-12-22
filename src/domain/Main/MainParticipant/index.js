import "./style.css";

import {useState} from "react";
import Page from "../../../components/Page";

import {participants} from "../../../data/participants";

import {faTimes, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MainParticipant() {
  const [curParticipant, setCurParticipant] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const changePeople = (index) => {
    if (index === curParticipant && showDetail) setShowDetail(false);
    else {
      setShowDetail(true);
      setCurParticipant(index);
    }
  };

  return (
    <>
      <Page
        className={"home-with-people-title-page"}
        style={{backgroundColor: "var(--color-dark-blue)", color: "white"}}
      >
        <h1 className={"section-title"}>
          <div>함께한 사람들</div>
          <div className={"subtitle font-light"}>Makers</div>
        </h1>
      </Page>

      {/* 참여자 상세보기 */}
      <Page
        parentClassName={`home-with-people-detail-page ${
          showDetail && "open-height"
        }`}
        className={"home-with-people-detail"}
        style={{backgroundColor: "var(--color-dark-blue)", color: "white"}}
      >
        <div
          className={"home-with-people-detail-close-btn"}
          onClick={() => setShowDetail(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>

        <div className={"home-with-people-detail-img"}>
          {participants[curParticipant + 3]?.img ? (
            <img src={participants[curParticipant + 3].img} alt={""} />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>

        <div className={"home-with-people-detail-content"}>
          <div className={"home-with-people-detail-info"}>
            <span>{participants[curParticipant + 3]?.name} </span>
            <span className={"font-light"}>
              {participants[curParticipant + 3]?.dept.join(" ")}
            </span>
          </div>

          <div
            className={"font-light"}
            dangerouslySetInnerHTML={{
              __html: participants[curParticipant + 3]?.feel,
            }}
          ></div>
        </div>
      </Page>

      {/* 참여자 목록 */}
      <Page
        className={"home-with-people-page"}
        style={{backgroundColor: "var(--color-dark-blue)"}}
      >
        <ul className={"home-with-people-wrapper"}>
          {participants.length > 0 &&
            participants?.slice(3).map((participant, index) => (
              <li
                className={`home-with-people ${
                  showDetail && curParticipant === index && "cur-people"
                }`}
                key={index}
                onClick={() => changePeople(index)}
              >
                {/* 사람 사진 */}
                <div className={"home-with-people-img"}>
                  {participant?.img ? (
                    <img src={participant?.img} alt={""} />
                  ) : (
                    <FontAwesomeIcon icon={faUserCircle} />
                  )}
                </div>

                {/* 사람 정보 */}
                <div className={"home-with-people-info"}>
                  <h2>{participant?.name}</h2>
                  <div className={"font-light"}>
                    {participant?.dept.map((dept, index) => (
                      <p key={index}>{dept}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <br />
        <br />

        <ul className={"home-with-people-wrapper"}>
          {participants.length > 0 &&
            participants?.slice(0, 3).map((participant, index) => (
              <li className={"home-with-people no-hover"} key={index}>
                {/* 사람 사진 */}
                <div className={"home-with-people-img"}>
                  {participant?.img ? (
                    <img src={participant?.img} alt={""} />
                  ) : (
                    <FontAwesomeIcon icon={faUserCircle} />
                  )}
                </div>

                {/* 사람 정보 */}
                <div className={"home-with-people-info"}>
                  <h2>{participant?.name}</h2>
                  <div className={"font-light"}>
                    {participant?.dept.map((dept, index) => (
                      <p key={index}>{dept}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </Page>
    </>
  );
}
