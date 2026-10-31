export const dynamic = "force-dynamic";

import { AdminMetricsService } from "@/services/admin-metrics.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const metrics = AdminMetricsService.getDashboardMetrics();

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Admin metrics route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
