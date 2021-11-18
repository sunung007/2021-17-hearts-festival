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
}) {
  return (
    <div
      id={parentId}
      className={`${parentClassName} page`}
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
