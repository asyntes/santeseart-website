import { RiArchiveDrawerLine, RiPencilRulerLine } from "react-icons/ri";
import {
  TbBrush,
  TbChisel,
  TbDoor,
  TbGrid3X3,
} from "react-icons/tb";

const icons = [
  TbChisel,
  TbGrid3X3,
  TbBrush,
  RiArchiveDrawerLine,
  TbDoor,
  RiPencilRulerLine,
] as const;

export function ServiceIcon({ index }: { index: number }) {
  const Icon = icons[index] ?? TbChisel;
  return (
    <div className="service-icon">
      <Icon className="h-7 w-7" aria-hidden />
    </div>
  );
}
