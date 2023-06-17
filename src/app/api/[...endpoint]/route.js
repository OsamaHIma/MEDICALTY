import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req, { params }) {
  const { endpoint } = params;

  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${endpoint[0]}/${endpoint[1]}`;

  const request = await req.json();
  const token = req.headers.get("token");

  const headers = {
    authorization: `Bearer ${token}`,
  };

  try {
    const { data } = await axios.post(url, request, { headers });
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
