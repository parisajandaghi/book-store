import { Button, Text } from "@mantine/core";
import style from "./button.module.css";
import { ButtonProps } from "./button.type";

export default function SecondaryButton({
  btnText,
  icon,
  width,
  hight,
  radius,
  onClick
}: ButtonProps) {
  return (
    <Button className={style.Secondary} w={width} h={hight} radius={radius} onClick={onClick}>
      {icon}
      <Text fz={14}>{btnText}</Text>
    </Button>
  );
}
