import { Button, Text } from "@mantine/core";
import React from "react";
import style from "./button.module.css";
import { ButtonProps } from "./button.type";
export default function PrimaryButton({ btnText }: ButtonProps) {
  return (
    <Button className={style.Primary}>
      <Text fz={14}>{btnText}</Text>
    </Button>
  );
}
