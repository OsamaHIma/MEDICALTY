import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { userRole, token } = await req.json();
  const headers = {
    token: token,
  };
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${
        userRole === "admin" ? "center/admin" : userRole
      }/logout`,
      { headers }
    );
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error.response);
  }
}
