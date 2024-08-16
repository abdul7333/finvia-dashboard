import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");

    if (token) {
      const res = NextResponse.json({ success: true, message: "Cookies set" });
      res.cookies.set({
        name: "next-token",
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      // res.cookies.set('token', token)
      return res;
    }

    return NextResponse.json(
      { success: false, message: "Token not available" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const res = NextResponse.json({
      success: true,
      message: "Cookies deleted",
    });
    res.cookies.delete("next-token");
    // res.cookies.delete('token');
    return res;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}
