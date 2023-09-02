"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BsCheck, BsCheck2All } from "react-icons/bs";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();

  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx(
    "flex gap-3  w-fit  p-4 rounded-md ",
    isOwn ? " ml-auto m-0 bg-sky-300 text-black" : "bg-gray-200"
  );

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2 ", isOwn && "items-end");

  const message = clsx(
    "text-sm overflow-hidden rounded-[20px]",
    data.image ? " p-0" : "rounded-full py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1  ">
          <div className="text-sm text-gray-500">
            {!isOwn ? data.sender.name : "Me"}
          </div>
          <div className=" text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="image"
              height="288"
              width="288"
              src={data.image}
              className=" object-cover cursor-pointer hover:scale-110 translate transition"
            />
          ) : (
            <div>{data.body} </div>
          )}
        </div>
      </div>
      {isOwn &&
        (seenList.length > 0 ? (
          <BsCheck2All size={20} className="text-blue-600" />
        ) : (
          <BsCheck size={20} className="text-blue-600" />
        ))}
    </div>
  );
};

export default MessageBox;
