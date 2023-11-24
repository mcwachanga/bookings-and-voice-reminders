import prisma from "@/lib/prisma";
import moment from "moment";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    
  const { customer, phone, reason, bookedOn } = await req.json();
  var doc = await prisma.appointment.create({
    data: {
      customer: customer,
      phone: phone,
      reason: reason,
      bookedOn: moment(bookedOn).toISOString(),
      reminded: false,
    },
  });
  return NextResponse.json(doc);
}

export async function GET() {
  const appointments = await prisma.appointment.findMany();
  return NextResponse.json(appointments);
}
