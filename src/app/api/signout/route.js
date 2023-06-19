import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { userType, token } = await req.json();
  const headers = {
    token: token,
  };
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${
        userType === "admin" ? "center/admin" : userType
      }/logout`,
      { headers }
    );
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error.response);
  }
}
