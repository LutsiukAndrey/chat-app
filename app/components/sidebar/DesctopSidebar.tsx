"use client";

import { useRoutes } from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesctopItem from "./DesctopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import { AiOutlineSetting } from "react-icons/ai";

interface DesctopSidebarProps {
  curentUser: User;
}

const DesctopSidebar: React.FC<DesctopSidebarProps> = ({ curentUser }) => {
  const routes = useRoutes();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        curentUser={curentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className=" hidden
       lg:fixed 
       lg:inset-y-0 
    lg:left-0
     lg:z-40 lg:w-60 
     xl:px-2
      lg:overflow-y-auto
     lg:bg-white 
     lg:border-r-[1px] lg:pb-4 
     lg:flex lg:flex-col
  "
      >
        <div className=" mt-4 flex flex-col justify-between items-center">
          <Avatar user={curentUser} />
          <p>{curentUser.name}</p>
        </div>
        <div className="flex flex-col justify-between h-full px-2">
          <nav className=" mt-4 flex flex-col justify-between">
            <ul role="list" className=" flex flex-col space-y-1">
              {routes.map(({ label, href, icon, active, onClick }) => (
                <DesctopItem
                  key={label}
                  href={href}
                  icon={icon}
                  active={active}
                  label={label}
                  onClick={onClick}
                />
              ))}
            </ul>
          </nav>
          <div
            onClick={() => setIsOpen(true)}
            className=" cursor-pointer group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-white hover:bg-orange-400"
          >
            <AiOutlineSetting className=" h-6 w-6 shrink-0 mr-2" />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesctopSidebar;
