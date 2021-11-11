import Page from "../../../components/Page";
import "./style.css";

export default function GuestComment({comments}) {
  const commentEnroll = (e) => {
    e.preventDefault();
    const result = {
      comment: e.target["guest-comment"].value,
      dpet: e.target["guest-dept"].value,
      name: e.target["guest-name"].value,
    };
    console.log(result);
  };

  return (
    <Page>
      <h1 className={"section-title"}>
        <div>방명록</div>
        <div className={"subtitle font-light"}>Guestbook</div>
      </h1>
      <br />

      <div>
        <form onSubmit={commentEnroll} className={"guest-comment"}>
          <div className={"guest-comment-enroll"}>
            <input
              id={"guest-comment"}
              type={"text"}
              className={"font-light"}
              placeholder={"방명록"}
              required={true}
            />
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
          </div>

          <button className={"guest-comment-enroll-btn"}>방명록 쓰기</button>
        </form>
        <br />

        <ul>
          {comments?.length > 0 ? (
            <></>
          ) : (
            <center className={"font-light"}>
              등록된 방명록이 없습니다. 방명록을 남겨서 관심을 표현하세요.
            </center>
          )}
        </ul>
      </div>
    </Page>
  );
}
