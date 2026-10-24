import { Button, Text } from "@mantine/core";
import style from "./button.module.css";
import { ButtonProps } from "./button.type";

export default function SecondaryButton({
  btnText,
  icon,
  width,
  hight,
  radius,
  onClick,
  size,
}: ButtonProps) {
  return (
    <Button
      className={style.Secondary}
      w={width}
      h={hight}
      size={size}
      radius={radius}
      onClick={onClick}
      px={btnText ? undefined : 0} /* اگر فقط آیکون است، پدینگ صفر شود تا مربع و متقارن بماند */
    >
      {icon}
      {btnText && <Text fz={{ base: 12, sm: 14 }}>{btnText}</Text>}
    </Button>
  );
}
