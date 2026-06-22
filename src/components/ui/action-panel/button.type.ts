import { ReactNode } from "react";

export type ButtonProps = {
  btnText?: string;
  width?: number | string;
  hight?: number | string;
  icon?: ReactNode;
  radius?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
};
