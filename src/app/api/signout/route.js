import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function POST(req) {
  console.log("sign out called");
  const { token } = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { userType } = req.body;
  const headers = {
    token: token,
  };
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${userType}/logout`,
      { headers }
    );
  console.log(data)

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error.response);
  }
}
