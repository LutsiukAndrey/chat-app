"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FieldValue,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../inputs/Button";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  curentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  curentUser,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: curentUser?.name,
      image: curentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something wrong"))
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" space-y-12">
          <div className=" border-b border-gray-900/10 pb-12">
            <h2 className=" text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className=" mt-1 text-sm leading-6 text-gray-600">
              Edit your bublic info
            </p>
            <div className=" mt-10 flex flex-col gap-y-8">
              <Input
                disabled={loading}
                label="Name"
                id="name"
                required
                register={register}
                errors={errors}
              />
              <div>
                <label className=" block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className=" mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    className=" rounded-full"
                    src={
                      image || curentUser?.image || "/images/placeholder.png"
                    }
                    alt="avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="czfod2tp"
                  >
                    <div>
                      {/* <Button disabled={loading} secondary type="button"> */}
                      Change
                      {/* </Button> */}
                    </div>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-6 flex items-center justify-end gap-x-6">
            <Button
              disabled={loading}
              secondary
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
