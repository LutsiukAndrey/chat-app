import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { useCallback, useState } from "react";
import Loader from "../components/Loader";

export default function Home() {
  return (
    <div className=" flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8  ">
      <AuthForm />
    </div>
  );
}
