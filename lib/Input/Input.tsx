import clsx from "clsx";

interface BaseProps {
  className?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  disabled?: boolean;
}

export const Input = () => {
  return (
    <input
      className="bg-[#303030] rounded-full text-sm font-light text-[#AFAFAF] px-6 py-3"
      type="Text"
      placeholder="Type here..."
    />
  );
};
