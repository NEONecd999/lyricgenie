import { CSSProperties } from "react";

interface SfIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const SfIcon = ({ name, size = 22, color = "currentColor", className = "", style }: SfIconProps) => {
  const mask = `url(/sf-symbols/${name}.svg) center/contain no-repeat`;
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
