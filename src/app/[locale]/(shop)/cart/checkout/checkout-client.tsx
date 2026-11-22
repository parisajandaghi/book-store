"use client";

import dynamic from "next/dynamic";
import CheckoutSkeleton from "@/features/checkout/components/checkout-skeleton";
import { Container } from "@mantine/core";

const CheckoutContent = dynamic(() => import("./checkout-content"), {
  ssr: false,
  loading: () => (
    <Container
      w="100%"
      maw="58rem"
      pt={{ base: 16, sm: 40 }}
      pb={{ base: 20, sm: 40 }}
      px={{ base: "xs", sm: "md" }}
    >
      {" "}
      <CheckoutSkeleton />
    </Container>
  ),
});

export default function CheckoutClient() {
  return <CheckoutContent />;
}
