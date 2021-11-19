import "./style.css";

export default function AlertModal({setShow, title, msg}) {
  return (
    <div id={"alert-modal"}>
      <h3>{title || "주의"}</h3>
      <p className={"font-light content"}>{msg}</p>
      <button onClick={() => setShow(false)}>닫기</button>
    </div>
  );
}
