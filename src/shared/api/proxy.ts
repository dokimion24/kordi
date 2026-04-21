import { NextResponse } from "next/server";
import { HTTPError } from "ky";

export async function proxyBackend<T>(run: () => Promise<T>): Promise<NextResponse> {
  try {
    const result = await run();
    return NextResponse.json(result ?? null);
  } catch (err) {
    if (err instanceof HTTPError) {
      const status = err.response.status;
      try {
        const body = await err.response.json();
        return NextResponse.json(body, { status });
      } catch {
        return NextResponse.json({ message: err.message }, { status });
      }
    }
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
