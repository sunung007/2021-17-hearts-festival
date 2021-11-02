import "./style.css";

export default function Page({
  className,
  style,
  children,
  props,
  shadow = true,
}) {
  return (
    <div
      className={`${shadow ? "" : "no-shadow"} page`}
      style={style}
      {...props}
    >
      <div className={`page-inner ${className}`}>{children}</div>
    </div>
  );
}
