import { IconType } from "react-icons";

interface AuthSotialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSotialButton: React.FC<AuthSotialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className=" inline-flex
       w-full
        justify-center 
       rounded-full
        bg-white
         px-4
          py-2
        text-gray-500 
        shadow-sm 
        ring-1
        ring-inset
         ring-gray-300
         hover:bg-orange-100
         focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};

export default AuthSotialButton;
