import { Divider } from "@mantine/core";
type DividerProp = {
  my?: string;
  width?: number | string;
};
export default function HorizontalDivider({ my, width }: DividerProp) {
  return (
    <Divider
      orientation="horizontal"
      my={my}
      w={width}
      styles={{
        root: {
          border: "none",
          height: "1px",

          backgroundImage:
            "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.42), transparent)",
        },
      }}
    />
  );
}
