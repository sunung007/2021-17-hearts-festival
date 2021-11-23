import "./style.css";
import {useCallback, useEffect, useState} from "react";

import Modal from "..";
import CheckEmailModal from "../CheckEmailModal";

export default function CommentOptionModal({pos, setShow, onEdit, onDelete}) {
  const [showEmailCheck, setShowEmailCheck] = useState(false);

  // 클릭 시 창 닫기
  const onClickOutside = useCallback(
    (e) => {
      let path = [];
      let currentElem = e.target;
      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }

      const el = document.getElementById("comment-option-modal");
      if (!path.includes(el) && !showEmailCheck) setShow(false);
    },
    [setShow, showEmailCheck]
  );

  useEffect(() => {
    // 위치 설정
    const el = document.getElementById("comment-option-modal");
    el.style.left = pos[0] + "px";
    el.style.top = pos[1] + "px";

    // 클릭 시 닫기
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [pos, onClickOutside]);

  return (
    <ul id={"comment-option-modal"}>
      {/* <li className={"comment-option-modal-item"} onClick={onEdit}>
        수정
      </li> */}
      <li
        className={"comment-option-modal-item"}
        onClick={() => setShowEmailCheck(true)}
      >
        삭제
      </li>
      <li
        className={"comment-option-modal-item"}
        onClick={() => setShow(false)}
      >
        닫기
      </li>

      {showEmailCheck && (
        <Modal background={"rgba(0, 0, 0, 0.5)"} style={{zIndex: "120"}}>
          <CheckEmailModal
            onOk={onDelete}
            onCancle={() => {
              setShowEmailCheck(false);
              setShow(false);
            }}
          />
        </Modal>
      )}
    </ul>
  );
}
