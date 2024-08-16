import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "./utils/utils";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("next-token")?.value as string;
  const url = req.nextUrl.clone();

  const isVerified = await verifyUser(token);

  if (isVerified && ["/"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } else if (!isVerified && !["/"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:function*", "/"],
};
