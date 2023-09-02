"use client";
import clsx from "clsx";
import Link from "next/link";

interface DesctopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}
const DesctopItem: React.FC<DesctopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handelClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handelClick}>
      <Link
        href={href}
        className={clsx(
          " group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-white hover:bg-orange-400",
          active && " bg-orange-500 text-white"
        )}
      >
        <Icon className=" h-6 w-6 shrink-0 mr-2" />
        <span className="">{label}</span>
      </Link>
    </li>
  );
};

export default DesctopItem;
