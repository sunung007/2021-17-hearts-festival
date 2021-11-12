import Page from "../../../components/Page";
import "./style.css";
import {useCallback, useEffect, useState} from "react";
import {useRef} from "react";
import {enrollComments, getComments} from "../../../hooks/firebase";

export default function GuestComment({cid}) {
  const commentArea = useRef();
  const [comments, setComments] = useState([]);

  const adjustHeight = useCallback(() => {
    commentArea.current.style.height = "16px";
    commentArea.current.style.height = commentArea.current.scrollHeight + "px";
  }, []);

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

  const commentEnroll = useCallback(
    (e) => {
      e.preventDefault();

      const valueEl = e.target["guest-comment-value"];
      const deptEl = e.target["guest-dept"];
      const nameEl = e.target["guest-name"];
      const emailEl = e.target["guest-email"];

      if (typeof cid === "number") {
        // 댓글 등록
        enrollComments(cid, {
          value: valueEl.value,
          author_dept: deptEl.value,
          author_name: nameEl.value,
          author_email: emailEl.value,
        })
          .then(() => {
            fetchComments(cid);
            console.log("방명록이 등록되었습니다.");

            valueEl.value = "";
            deptEl.value = "";
            nameEl.value = "";
            emailEl.value = "";
          })
          .catch((e) => {
            console.error(e);
            alert("방명록 작성에 실패하였습니다.");
          });
      } else alert("방명록 작성에 실패하였습니다.");

      e.returnValue = true;
    },
    [cid, fetchComments]
  );

  useEffect(() => {
    if (typeof cid === "number") fetchComments(cid);
  }, [cid, fetchComments]);

  return (
    <Page>
      <h1 className={"section-title"}>
        <div>방명록</div>
        <div className={"subtitle"}>Guestbook</div>
      </h1>
      <br />

      <div>
        <form onSubmit={commentEnroll} className={"guest-comment"}>
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
            <textarea
              ref={commentArea}
              id={"guest-comment-value"}
              className={"font-light"}
              placeholder={"방명록"}
              required={true}
              onKeyUp={adjustHeight}
            />
          </div>

          <button className={"guest-comment-enroll-btn"}>방명록 쓰기</button>

          <h5 className={"font-ultra-light"}>
            * 이메일은 이벤트 시 연락을 위해 받고 있습니다.
          </h5>
        </form>
        <br />

        <ul className={"guest-comment-wrapper font-light"}>
          {comments?.length > 0 ? (
            comments?.map((comment, index) => (
              <li className={"guest-comment-item"} key={index}>
                <div>{comment.value}</div>
                <div>
                  {comment.author_dept} {comment.author_name}{" "}
                  <span className={"guest-comment-item-date"}>
                    {comment.time}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <center className={"font-ultra-light"}>
              등록된 방명록이 없습니다. 방명록을 남겨서 관심을 표현하세요.
            </center>
          )}
        </ul>
      </div>
    </Page>
  );
}
