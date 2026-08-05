import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getUserAddresses, createAddress } from "@/services/address.service";
import { getErrorMessage } from "@/utils/error";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addresses = getUserAddresses(user.id);
    return NextResponse.json(addresses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // اعتبارسنجی ساده
    if (!body.recipientName || !body.phone || !body.address) {
      return NextResponse.json(
        { error: "تمام فیلدها الزامی است" },
        { status: 400 },
      );
    }

    const newAddress = createAddress(user.id, {
      recipientName: body.recipientName,
      phone: body.phone,
      address: body.address,
    });

    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
