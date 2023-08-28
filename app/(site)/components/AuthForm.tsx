"use client";

import Button from "@/app/components/inputs/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import AuthSotialButton from "./AuthSotialButton";
import { BsLinkedin, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

interface AuthFormProps {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ loading, setLoading }) => {
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (variant === "REGISTER") {
      console.log("asd");
    }
    if (variant === "LOGIN") {
      console.log(data);
    }
  };

  const socialAction = (action: string) => {
    setLoading(true);
    console.log(action);
  };

  return (
    <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={loading}
              id="name"
              label="Name"
              register={register}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <div>
            <Button disabled={loading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className=" mt-6">
          <div className=" relative">
            <div className=" absolute inset-0 flex items-center">
              <div className=" w-full border-t border-gray-300" />
            </div>
            <div className=" relative flex justify-center text-sm">
              <span className=" bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className=" mt-6 flex gap-2">
            <AuthSotialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            <AuthSotialButton
              icon={BsLinkedin}
              onClick={() => socialAction("linkedin")}
            />
          </div>
        </div>
        <div className=" flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <p>
            {variant === "LOGIN" ? "New to chat?" : "Already have an account?"}
          </p>
          <p onClick={toggleVariant} className=" underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
