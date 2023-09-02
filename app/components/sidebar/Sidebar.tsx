import React from "react";
import DesctopSidebar from "./DesctopSidebar";
import MobileFooter from "./MobileFooter";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const curentUser = await getCurrentUser();

  return (
    <div className=" h-full">
      <DesctopSidebar curentUser={curentUser!} />
      <MobileFooter curentUser={curentUser!} />
      <main className=" lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
