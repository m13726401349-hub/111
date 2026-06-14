import inquiryHandler from "../../../api/inquiry.js";

export async function POST(request) {
  return inquiryHandler(request, { env: process.env });
}

export function GET() {
  return Response.json({ message: "Method not allowed." }, { status: 405 });
}
