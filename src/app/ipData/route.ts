import { getData } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ipAddress = searchParams.get("ipAddress") ?? undefined;

  const response = await getData(ipAddress);

  return Response.json({ response });
}
