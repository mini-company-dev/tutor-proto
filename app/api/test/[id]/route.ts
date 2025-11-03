// app/test/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return NextResponse.json({
    message: `You requested test with id = ${id}`,
  });
}
