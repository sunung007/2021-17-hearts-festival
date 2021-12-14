import "./style.css";

import {useCallback, useEffect, useState, useRef} from "react";

import Page from "../../../components/Page";
import Modal from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import CommentOptionModal from "../../../components/Modal/CommentOptionModal";

import {
  enrollComment as faEnrollComment,
  getComments,
  deleteComment as fbDeleteComment,
} from "../../../hooks/firebase";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

const COMMENT_NUM = 5;

export default function GuestComment({cid}) {
  const commentArea = useRef();

  const [comments, setComments] = useState([]);
  const [commentIndex, setCommentIndex] = useState(0);

  const [menuPos, setMenuPos] = useState([0, 0]);
  const [menuTarget, setMenuTarget] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({title: "", msg: ""});
  const [longTouchTimer, setLongTouchTimer] = useState();

  const fetchComments = useCallback((cid) => {
    getComments(cid)
      .then((r) =>
        setComments(
          r
            .sort((a, b) => b.time.seconds - a.time.seconds)
            .map((tmp) => {
              const date = new Date(tmp.time.seconds * 1000);
              return {
                ...tmp,
                time: `${date.getFullYear() % 100}.${
                  date.getMonth() + 1
                }.${date.getDate()}`,
              };
            })
        )
      )
      .catch((e) => {
        console.error("댓글을 읽어오지 못했습니다.");
        console.error(e);
      });
  }, []);
  const enrollComment = useCallback(
    (e) => {
      e.preventDefault();

      const valueEl = e.target["guest-comment-value"];
      const deptEl = e.target["guest-dept"];
      const nameEl = e.target["guest-name"];
      const emailEl = e.target["guest-email"];

      if (typeof cid === "number") {
        // 댓글 등록
        faEnrollComment(cid, {
          value: valueEl.value,
          author_dept: deptEl.value,
          author_name: nameEl.value,
          author_email: emailEl.value,
        })
          .then(() => {
            fetchComments(cid);
            setAlertContent({
              title: "방명록이 등록되었습니다.",
            });
            setShowAlert(true);

            // 입력창 초기화
            valueEl.value = deptEl.value = nameEl.value = emailEl.value = "";
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
              msg: "방명록을 작성할 수 없습니다. 이 오류가 계속되면 한양대학교 사회혁신센터로 문의바랍니다.",
            });
            setShowAlert(true);
          });
      } else {
        setAlertContent({
          title: (
            <>
              <span style={{color: "red"}}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>{" "}
              오류
            </>
          ),
          msg: "방명록을 작성할 수 없습니다. 이 오류가 계속되면 한양대학교 사회혁신센터로 문의바랍니다.",
        });
        setShowAlert(true);
      }

      e.returnValue = true;
    },
    [cid, fetchComments]
  );
  const deleteComment = (email) => {
    if (setMenuTarget.hasOwnProperty("author_email")) {
      setAlertContent({
        title: (
          <>
            <span style={{color: "red"}}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>{" "}
            오류
          </>
        ),
        msg: "방명록을 삭제할 수 없습니다.",
      });
      setShowAlert(true);
      return;
    }

    if (menuTarget?.author_email === email) {
      fbDeleteComment(cid, menuTarget)
        .then((r) => {
          setAlertContent({
            title: "방명록을 삭제하였습니다.",
          });
          setShowAlert(true);

          setComments(
            r
              .sort((a, b) => b.time.seconds - a.time.seconds)
              .map((tmp) => {
                const date = new Date(tmp.time.seconds * 1000);
                return {
                  ...tmp,
                  time: `${date.getFullYear() % 100}.${
                    date.getMonth() + 1
                  }.${date.getDate()}`,
                };
              })
          );
        })
        .catch((e) => {
          console.error("FIREBASE : 방명록 삭제 오류");
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
            msg: "방명록을 삭제할 수 없습니다. 인터넷 연결이 올바른지 확인해주세요.",
          });
          setShowAlert(true);
        })
        .finally(() => setShowMenu(false));
    } else {
      setAlertContent({
        title: (
          <>
            <span style={{color: "orange"}}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>{" "}
            주의
          </>
        ),
        msg: "이메일이 일치하지 않습니다.",
      });
      setShowAlert(true);
    }
  };

  const openOption = (e) => {
    e.preventDefault();
    setMenuPos([e.clientX, e.clientY]);
    setMenuTarget(comments[parseInt(e.target.id)]);
    setShowMenu(true);
  };
  const longTouch = (e) => {
    const {clientX, clientY} = e.changedTouches[0];
    setMenuPos([clientX, clientY]);
    setMenuTarget(comments[parseInt(e.target.id)]);
    setLongTouchTimer(setTimeout(() => setShowMenu(true), 400));
  };
  const longTouchCancle = () => {
    if (longTouchTimer) clearTimeout(longTouchTimer);
    setLongTouchTimer(undefined);
  };

  useEffect(() => {
    if (typeof cid === "number") fetchComments(cid);
  }, [cid, fetchComments]);

  return (
    <Page parentClassName={"company-comment-page"}>
      <h1 className={"section-title"}>
        <div>방명록</div>
        <div className={"subtitle"}>Guestbook</div>
      </h1>
      <br />

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
            <input
              id={"guest-email"}
              type={"email"}
              className={"font-light"}
              placeholder={"이메일(선택)"}
            />
          </div>

          <div className={"guest-comment-enroll"}>
            <input
              ref={commentArea}
              id={"guest-comment-value"}
              className={"font-light"}
              type={"text"}
              placeholder={"방명록"}
              required={true}
            />
          </div>

          <button className={"guest-comment-enroll-btn"}>방명록 쓰기</button>

          <h5 className={"font-ultra-light"} style={{lineHeight: "1.5em"}}>
            * 이메일은 경품 추첨 시 연락을 위해 받고 있습니다.
            <br />* 이메일을 입력하지 않으면 댓글 수정/삭제가 불가능하며, 경품
            추첨 이벤트 참여에 제한될 수 있습니다.
            <br />
            * 입력하신 개인정보는 경품 제공을 위해서만 사용되며, 행사 종료 후
            1년의 보관기간 이후 파기됩니다.
            <br />* 제출버튼을 누르시는 것은 위 사항에 대해 동의함으로
            간주합니다.
          </h5>
        </form>
        <br />

        <ul className={"guest-comment-wrapper font-light"}>
          {comments?.length > 0 ? (
            comments
              ?.slice(
                COMMENT_NUM * commentIndex,
                COMMENT_NUM * commentIndex + COMMENT_NUM > comments.length
                  ? comments.length
                  : COMMENT_NUM * commentIndex + COMMENT_NUM
              )
              .map((comment, index) => (
                <li
                  id={index}
                  key={index}
                  className={"guest-comment-item"}
                  onContextMenu={openOption}
                  onTouchStart={longTouch}
                  onTouchEnd={longTouchCancle}
                >
                  <div className={"guest-comment-item-1"} id={index}>
                    {comment.value}
                  </div>
                  <div className={"guest-comment-item-sub"} id={index}>
                    {comment.author_dept} {comment.author_name}{" "}
                    <span className={"guest-comment-item-date"}>
                      {comment.time}
                    </span>
                  </div>
                </li>
              ))
          ) : (
            <center className={"font-ultra-light"}>
              등록된 방명록이 없습니다. 방명록을 남겨서 관심을 표현해주세요.
            </center>
          )}
        </ul>
      </div>

      {/* 목록 */}
      <ul className={"comment-index-list"}>
        {comments?.length / COMMENT_NUM > 1 &&
          Array.from(
            {length: Math.ceil(comments?.length / COMMENT_NUM)},
            (v, i) => i
          ).map((i) => (
            <li
              key={i}
              className={`comment-index-item ${
                i === commentIndex && "current"
              }`}
              onClick={() => setCommentIndex(i)}
            >
              {i + 1}
            </li>
          ))}
      </ul>

      {/* 설정 팝업창 */}
      {showMenu && (
        <Modal>
          <CommentOptionModal
            pos={menuPos}
            setShow={setShowMenu}
            onDelete={deleteComment}
          />
        </Modal>
      )}

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
