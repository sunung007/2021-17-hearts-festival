import "./style.css";
import ReactDOM from "react-dom";
import {useEffect} from "react";

export default function Modal({id, style, className, children, background}) {
  const el = document.getElementById("modal");
  const preventContextMenu = (e) => e.preventDefault();
  useEffect(() => {
    el.addEventListener("contextmenu", preventContextMenu);
    return () => el.removeEventListener("contextmenu", preventContextMenu);
  }, [el]);

  return ReactDOM.createPortal(
    <div
      id={"modal-child"}
      className={className}
      style={background ? {...style, background: background} : style}
    >
      <>{children}</>
    </div>,
    el
  );
}
