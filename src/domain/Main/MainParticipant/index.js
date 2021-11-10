import "./style.css";

import Page from "../../../components/Page";

import {participants} from "../../../data/participants";
import {BACKGROUND_COLOR_GRAY} from "../../../hooks/common";

import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";

function MainParticipantDetail({curParticipant}) {
  const [animation, setAnimation] = useState(false);
  const onAnimationEnd = () => setAnimation(false);

  useEffect(() => setAnimation(curParticipant >= 0), [curParticipant]);

  if (curParticipant < 0) return <></>;
  else
    return (
      <Page
        parentClassName={`${animation && "open-height"}`}
        className={"home-with-people-detail"}
        parentOnAnimationEnd={onAnimationEnd}
        shadow={false}
      >
        <div className={"home-with-people-detail-img"}>
          {participants[curParticipant].img ? (
            <img src={participants[curParticipant].img} alt={""} />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </div>

        <div className={"home-with-people-detail-content"}>
          <div className={"home-with-people-detail-info"}>
            <span>{participants[curParticipant].name} </span>
            <span className={"font-light"}>
              {participants[curParticipant].dept.join(" ")}
            </span>
          </div>

          <div className={"font-light"}>
            {participants[curParticipant]?.feel}
          </div>
        </div>
      </Page>
    );
}

export default function MainParticipant() {
  const [curParticipant, setCurParticipant] = useState(-1);
  const changePeople = (index) =>
    setCurParticipant(index === curParticipant ? -1 : index);

  return (
    <>
      <Page
        className={"home-with-people-title-page"}
        style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
        shadow={false}
      >
        <h1 className={"section-title"}>
          <div>함께한 사람들</div>
          <div className={"subtitle font-light"}>Epilogue</div>
        </h1>
      </Page>

      {/* 참여자 상세보기 */}
      <MainParticipantDetail curParticipant={curParticipant} />

      {/* 참여자 목록 */}
      <Page
        style={{backgroundColor: BACKGROUND_COLOR_GRAY}}
        className={"home-with-people-page"}
      >
        <ul className={"home-with-people-wrapper"}>
          {participants.map((participant, index) => (
            <li
              className={"home-with-people"}
              key={index}
              onClick={() => changePeople(index)}
            >
              {/* 사람 사진 */}
              <div className={"home-with-people-img"}>
                {participant.img ? (
                  <img src={participant.img} alt={""} />
                ) : (
                  <FontAwesomeIcon icon={faUserCircle} />
                )}
              </div>

              {/* 사람 정보 */}
              <div className={"home-with-people-info"}>
                <h2>{participant.name}</h2>
                <p className={"font-light"}>
                  {participant.dept.map((dept, index) => (
                    <>
                      {dept}
                      <br />
                    </>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
