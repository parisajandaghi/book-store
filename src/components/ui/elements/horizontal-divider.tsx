import { Divider } from "@mantine/core";
type DividerProp = {
  my?: string;
};
export default function HorizontalDivider({ my }: DividerProp) {
  return (
    <Divider
      orientation="horizontal"
      my={my}
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
