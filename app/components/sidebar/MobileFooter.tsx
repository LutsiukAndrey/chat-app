"use client";

import { useConversation } from "@/app/hooks/useConversation";
import { useRoutes } from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

import { AiOutlineSetting } from "react-icons/ai";
import { User } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import SettingsModal from "./SettingsModal";

interface MobileFooterProps {
  curentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ curentUser }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const routes = useRoutes();

  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingsModal
        curentUser={curentUser}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <div className=" fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
        {routes.map(({ label, href, icon, active, onClick }) => (
          <MobileItem
            key={label}
            href={href}
            icon={icon}
            active={active}
            label={label}
            onClick={onClick}
          />
        ))}
        <div
          onClick={() => setIsSettingsOpen(true)}
          className=" cursor-pointer group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100"
        >
          <AiOutlineSetting className=" h-8 w-8" />
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
