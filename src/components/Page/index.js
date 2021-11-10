import "./style.css";

export default function Page({
  parentClassName,
  className,
  style,
  children,
  props,
  onAnimationEnd,
  parentOnAnimationEnd,
  shadow = true,
}) {
  return (
    <div
      className={`${parentClassName} ${shadow ? "" : "no-shadow"} page`}
      onAnimationEnd={parentOnAnimationEnd}
      style={style}
      {...props}
    >
      <div
        className={`page-inner ${className}`}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    </div>
  );
}
