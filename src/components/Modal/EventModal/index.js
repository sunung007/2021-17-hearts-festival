import "./style.css";
import EventInfo from "../../../domain/EventInfo/index";
import {useHistory} from "react-router";
import {useEffect} from "react";

export function EventModal({setShow}) {
  const history = useHistory();
  const closeFunc = () => setShow(false);

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

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
