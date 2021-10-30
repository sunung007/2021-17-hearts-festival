import "./style.css";

export default function Page({className, style, children, props}) {
  return (
    <div className={`page ${className}`} style={style} {...props}>
      {children}
    </div>
  );
}
