"use client";

import Modal from "@/app/components/Modal";
import { useConversation } from "@/app/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import Button from "@/app/components/inputs/Button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const { conversationId } = useConversation();

  const [loading, setLoading] = useState(false);

  const onDelete = useCallback(() => {
    setLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("something wrong"))
      .finally(() => setLoading(false));
  }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className=" mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className=" h-6 w-6 text-red-600" />
        </div>

        <div className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className=" text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className=" mt-2">
            <p className=" text-sm text-gray-500">
              You try to delete this conversation. This action cannot be undone
            </p>
          </div>
        </div>
      </div>

      <div className=" mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={loading} type="button" danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={loading} type="button" secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
