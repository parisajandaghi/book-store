import { Button, Text } from "@mantine/core";
import style from "./button.module.css";
import { ButtonProps } from "./button.type";
export default function PrimaryButton({
  btnText,
  width,
  onClick,
  type,
  isLoading,
}: ButtonProps) {
  return (
    <Button
      className={style.Primary}
      w={width}
      onClick={onClick}
      type={type}
      loading={isLoading}
    >
      <Text fz={14}>{btnText}</Text>
    </Button>
  );
}
