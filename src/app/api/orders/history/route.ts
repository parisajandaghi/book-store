import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/error";
import { getOrderHistory } from "@/services/order.service";

export function GET() {
  try {
    const userId = 1;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = getOrderHistory(userId);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
