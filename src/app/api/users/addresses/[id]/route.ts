// E:\reactdeveloper\bookstore-project\book-store\src\app\api\users\addresses\[id]\route.ts
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { deleteAddress, updateAddress } from "@/services/address.service";
import { getErrorMessage } from "@/utils/error";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const addressId = Number(id);

    if (isNaN(addressId)) {
      return NextResponse.json({ error: "شناسه آدرس نامعتبر است" }, { status: 400 });
    }

    const body = await req.json();

    if (!body.recipientName || !body.phone || !body.address) {
      return NextResponse.json(
        { error: "تمام فیلدها الزامی است" },
        { status: 400 },
      );
    }

    const success = updateAddress(addressId, Number(user.id), {
      recipientName: body.recipientName,
      phone: body.phone,
      address: body.address,
    });

    if (!success) {
      return NextResponse.json({ error: "آدرس یافت نشد یا دسترسی ندارید" }, { status: 404 });
    }

    return NextResponse.json({ message: "آدرس با موفقیت ویرایش شد" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const addressId = Number(id);

    if (isNaN(addressId)) {
      return NextResponse.json({ error: "شناسه آدرس نامعتبر است" }, { status: 400 });
    }

    const success = deleteAddress(addressId, Number(user.id));

    if (!success) {
      return NextResponse.json({ error: "آدرس یافت نشد یا دسترسی ندارید" }, { status: 404 });
    }

    return NextResponse.json({ message: "آدرس با موفقیت حذف شد" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
