"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  return <div>GroupChatModal</div>;
};

export default GroupChatModal;
