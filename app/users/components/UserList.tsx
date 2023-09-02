"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}
const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside className=" fixed inset-y-0 pb-20 lg:pb-0 lg:left-60 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className=" flex-col bg-white mb-2 rounded-b-md px-2 py-4">
        <h4 className=" text-2xl font-bold text-neutral-800 ">Users</h4>
      </div>
      <div className=" px-5 space-y-2 ">
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
