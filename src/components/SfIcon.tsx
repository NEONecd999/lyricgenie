import { CSSProperties } from "react";

interface SfIconProps {
  /** SF Symbol name from public/sf-symbols (omit if using `src`). */
  name?: string;
  /** Custom SVG path (absolute URL). Overrides `name` when provided. */
  src?: string;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const SfIcon = ({ name, src, size = 22, color = "currentColor", className = "", style }: SfIconProps) => {
  const url = src ?? (name ? `/sf-symbols/${name}.svg` : "");
  const mask = `url(${url}) center/contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMask: mask,
        mask,
        flexShrink: 0,
        ...style,
      }}
    />
  );
};

export default SfIcon;
