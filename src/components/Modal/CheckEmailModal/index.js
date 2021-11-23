import "./style.css";

export default function CheckEmailModal({onOk, onCancle}) {
  const onDelete = (e) => {
    e.preventDefault();
    onOk(e.target[0].value);
  };
  return (
    <form id={"check-email-modal"} onSubmit={onDelete}>
      <h4 className={"title"}>방명록 삭제</h4>
      <p className={"subtitle font-light"}>
        본인 확인을 위해 방명록 작성 시 입력한 이메일을 입력하세요.
      </p>

      <input type={"email"} required={true} placeholder={"이메일"} />

      <button className={"ok-btn"} type={"submit"}>
        확인
      </button>
      <button type={"button"} onClick={onCancle}>
        취소
      </button>
    </form>
  );
}
