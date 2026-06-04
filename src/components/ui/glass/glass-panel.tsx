import { Stack, StackProps } from "@mantine/core";

export default function GlassPanel({ children, style, ...props }: StackProps) {
  return (
    <Stack
      {...props}
      style={{
        backgroundColor: "#1f0f1fa8",
        borderRadius: 8,
        border: "1px solid #d4af3766",

        ...style,
      }}
    >
      {children}
    </Stack>
  );
}
