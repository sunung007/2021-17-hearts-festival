import "./style.css";
import {useState, useRef} from "react";
import Page from "../../../components/Page";

export default function EventComment() {
  const commentArea = useRef();
  const [eventType, setEventType] = useState("answerN");

  return (
    <Page parentClassName={"company-comment-page"}>
      <div>
        <form onSubmit={(e) => e.preventDefault()} className={"guest-comment"}>
          <div className={"guest-comment-event-type"}>
            <div
              onClick={() => setEventType("answerN")}
              style={
                eventType === "answerN"
                  ? {backgroundColor: "var(--color-dark-blue)", color: "white"}
                  : {}
              }
            >
              N 맞추기
            </div>
            <div
              onClick={() => setEventType("hylion")}
              style={
                eventType === "hylion"
                  ? {backgroundColor: "var(--color-dark-blue)", color: "white"}
                  : {}
              }
            >
              하이리온 맞추기
            </div>
          </div>

          <div className={"guest-comment-detail-info"}>
            <input
              id={"guest-dept"}
              type={"text"}
              className={"font-light"}
              placeholder={"소속/학과"}
              required={true}
            />
            <input
              id={"guest-name"}
              type={"text"}
              className={"font-light"}
              placeholder={"이름"}
              required={true}
            />
            <input
              id={"guest-email"}
              type={"email"}
              className={"font-light"}
              placeholder={"이메일"}
              required={true}
            />
          </div>

          <div className={"guest-comment-enroll"}>
            <input
              ref={commentArea}
              id={"guest-comment-value"}
              type={"text"}
              placeholder={"정답"}
              required={true}
              className={"font-light"}
            />
          </div>

          {/* <button className={"guest-comment-enroll-btn"}>정답 달기</button> */}

          <h5 className={"font-light"} style={{lineHeight: "1.5em"}}>
            * 이메일은 경품 추첨 시 연락을 위해 받고 있습니다.
            <br />
            * 입력하신 개인정보는 경품 제공을 위해서만 사용되며, 행사 종료 후
            1년의 보관기간 이후 파기됩니다.
            <br />* 제출버튼을 누르시는 것은 위 사항에 대해 동의함으로
            간주합니다.
          </h5>
        </form>
        <br />

        <ul className={"guest-comment-wrapper font-light"}>
          <center>6th Seventeen Hearts Festival이 종료되었습니다.</center>
        </ul>
      </div>
    </Page>
  );
}
