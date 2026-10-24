import { StyleProp } from "@mantine/core";
import { ReactNode } from "react";

export type ButtonProps = {
  mt?: string;
  btnText?: string;
  size?: string;
  width?: StyleProp<number | string>;
  hight?: StyleProp<number | string>;
  icon?: ReactNode;
  radius?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
};
