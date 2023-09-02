"use client";

import Button from "@/app/components/inputs/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import AuthSotialButton from "./AuthSotialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { AiOutlineUser } from "react-icons/ai";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [variant, setVariant] = useState<Variant>("LOGIN");

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [router, session?.status]);

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
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data);
        })
        .catch(() =>
          toast.error(
            !data.name && !data.email && !data.password
              ? "Fill in all the fields"
              : !data.name
              ? "Name is required"
              : !data.email
              ? "Email is required"
              : !data.password
              ? "Password is required"
              : "Something wrong! May be user already exist"
          )
        )
        .finally(() => {
          setLoading(false);
        });
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback?.error);
          }
          if (callback?.ok && !callback.error) {
            toast.success("Logged in");
            router.push("/users");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback?.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className=" sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <Image
            alt="logo"
            height="48"
            width="48"
            className="mx-auto w-auto"
            src="/images/logo.png"
          />

          <h1 className=" my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign to Chat
          </h1>
          <p>You can login with Google or GitHub Account:</p>
          <div className=" mt-6 flex gap-2">
            <AuthSotialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            <AuthSotialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
          </div>
        </div>
        <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={loading}
              icon={AiOutlineUser}
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
        </div>
        <div className=" flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <p>
            {variant === "LOGIN" ? "New to chat?" : "Already have an account?"}
          </p>
          <p
            onClick={toggleVariant}
            className=" underline cursor-pointer text-orange-500"
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
