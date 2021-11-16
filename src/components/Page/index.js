import "./style.css";

export default function Page({
  parentId,
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
      id={parentId}
      className={`${parentClassName} ${
        shadow
          ? className === "page-header"
            ? "shadow"
            : undefined
          : "no-shadow"
      } page`}
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
