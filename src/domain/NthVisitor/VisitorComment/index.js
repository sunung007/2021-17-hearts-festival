import "./style.css";

import {useCallback, useState} from "react";

import Page from "../../../components/Page";
import Modal from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

import {enrollNthComment as faEnrollComment} from "../../../hooks/firebase";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

export default function VisitorComment() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({title: "", msg: ""});

  const enrollComment = useCallback((e) => {
    e.preventDefault();

    const deptEl = e.target["guest-dept"];
    const nameEl = e.target["guest-name"];
    const emailEl = e.target["guest-email"];
    const telEl = e.target["guest-tel"];

    // 댓글 등록
    faEnrollComment({
      author_tel: telEl.value,
      author_dept: deptEl.value,
      author_name: nameEl.value,
      author_email: emailEl.value,
    })
      .then(() => {
        setAlertContent({
          title: "답변이 등록되었습니다.",
        });
        setShowAlert(true);

        // 입력창 초기화
        deptEl.value = nameEl.value = emailEl.value = telEl.value = "";
      })
      .catch((e) => {
        console.error(e);
        setAlertContent({
          title: (
            <>
              <span style={{color: "red"}}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>{" "}
              오류
            </>
          ),
          msg: "답변을 작성할 수 없습니다. 이 오류가 계속되면 한양대학교 사회혁신센터로 문의바랍니다.",
        });
        setShowAlert(true);
      });

    e.returnValue = true;
  }, []);

  return (
    <Page parentClassName={"company-comment-page"}>
      <div>
        <form onSubmit={enrollComment} className={"guest-comment"}>
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
          </div>

          <div className={"guest-comment-detail-info"}>
            <input
              id={"guest-email"}
              type={"email"}
              className={"font-light"}
              placeholder={"이메일"}
              required={true}
            />
            <input
              id={"guest-tel"}
              type={"tel"}
              className={"font-light"}
              placeholder={"연락처"}
              required={true}
            />
          </div>

          <button className={"guest-comment-enroll-btn"}>
            개인정보 동의 및 제출
          </button>
        </form>
      </div>

      {/* 경고창 */}
      {showAlert && (
        <Modal background={"rgba(0, 0, 0, 0.5)"} style={{zIndex: "140"}}>
          <AlertModal
            setShow={setShowAlert}
            title={alertContent.title}
            msg={alertContent.msg}
          />
        </Modal>
      )}
    </Page>
  );
}
