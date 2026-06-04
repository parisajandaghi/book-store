import { Button, Text } from "@mantine/core";
import style from "./button.module.css";
import { ButtonProps } from "./button.type";

export default function SecondaryButton({ btnText, icon }: ButtonProps) {
  return (
    <Button className={style.Secondary}>
      {icon}
      <Text fz={14}>{btnText}</Text>
    </Button>
  );
}
