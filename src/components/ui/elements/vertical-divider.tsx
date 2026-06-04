import { Divider } from "@mantine/core";
import React from "react";
type DividerProp = {
  my?: string;
};
export default function VerticalDivider({ my }: DividerProp) {
  return (
    <Divider
      orientation="vertical"
      my={my}
      styles={{
        root: {
          border: "none",
          width: "0.9px",
          backgroundImage:
            "linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.42), transparent)",
        },
      }}
    />
  );
}
