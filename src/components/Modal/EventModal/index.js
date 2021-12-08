import "./style.css";
import EventInfo from "../../../domain/EventInfo/index";
import {useHistory} from "react-router";

export function EventModal({setShow}) {
  const history = useHistory();
  const closeFunc = () => setShow(false);
  return (
    <div id="event-modal">
      <EventInfo closeFunc={closeFunc} />

      <ul className={"modal-options"}>
        <li onClick={() => history.push("/event")}>이벤트 상세 페이지 보기</li>
        <li onClick={() => setShow(false)}>닫기</li>

        <li
          onClick={() => {
            localStorage.setItem("event-modal", false);
            localStorage.setItem("event-modal-time", new Date());
            setShow(false);
          }}
        >
          하루동안 안보기
        </li>
      </ul>
    </div>
  );
}
