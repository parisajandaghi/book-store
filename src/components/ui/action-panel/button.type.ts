import { ReactNode } from "react";

export type ButtonProps = {
  btnText?: string;
  width?: number | string;
  hight?: number | string;
  icon?: ReactNode;
  radius?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" ;
};
