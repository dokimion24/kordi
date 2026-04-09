import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/shared/api";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await apiClient.post("api/scores", { json: body }).json();
  return NextResponse.json(result);
}
