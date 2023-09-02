"use client";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { BsCheck, BsCheck2All } from "react-icons/bs";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArr = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArr.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const isOwn = session?.data?.user?.email === lastMessage?.sender?.email;

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started an conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        " w-full p-3 relative flex items-center space-x-3 hover:bg-orange-400 rounded-lg transition cursor-pointer",
        selected ? "bg-orange-500 " : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className=" min-w-0 flex-1">
        <div className=" focus:outline-none flex">
          <div className=" flex flex-col justify-between mb-1 overflow-hidden">
            <p className=" text-lg font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            <p
              className={clsx(
                " truncate text-sm max-w-[140px]",
                hasSeen ? "text-gray-400" : "text-black font-medium",
                selected && " text-white"
              )}
            >
              {isOwn ? "You: " + lastMessageText : lastMessageText}
            </p>
          </div>

          {lastMessage?.createdAt && (
            <div className=" flex flex-col items-center gap-2 mr-0 ml-auto">
              <p
                className={clsx(
                  "text-xs text-gray-400 font-light",
                  selected && " text-white"
                )}
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
              {!hasSeen && (
                <span className="rounded-full bg-orange-400 ring-2 ring-white top-10 right-10 h-2 w-2 md:h-3 md:w-3" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
