"use client";

import Modal from "@/app/components/Modal";

import Image from "next/image";

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" w-[40rem] h-[40rem]">
        <Image alt="image" className="object-cover " fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
