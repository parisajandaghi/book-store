import { Stack, Title, Text } from "@mantine/core";
import style from "./quote.module.css";
import { QuoteBoxProps } from "./quote.type";

export default function QuoteBox({ quote, author }: QuoteBoxProps) {
  return (
    <Stack className={style.quoteWrapper}>
      <Title order={5} c="textMain.2" className={style.title}>
        {quote}
      </Title>
      <Text c="textMain.2" opacity={0.7}>
        {author}
      </Text>
    </Stack>
  );
}
