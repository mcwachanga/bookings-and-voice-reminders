import prisma from "@/lib/prisma";
import moment from "moment";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

var twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


export async function GET(req: NextRequest) {
  const startDate = moment().add(1, "days").format("YYYY-MM-DD");
  const endDate = moment().add(2, "days").format("YYYY-MM-DD");

  // check for today's reminders
  const appointments = await prisma.appointment.findMany({
    where: {
      bookedOn: {
        gte: new Date(startDate).toISOString(),
        lt: new Date(endDate).toISOString(),
      },
    },
  });

  appointments.map((appointment) => {
    client.calls
      .create({
        twiml: `<Response>
                  <Gather input="dtmf" timeout="5" numDigits="1" action="/api/reminders" method="POST">
                    <Say>Hello ${appointment.customer}, 
                      we would like to remind you of your ${appointment.reason} appointment tomorrow.
                      Press 1 if you want to confirm or 2 if you want to cancel.
                    </Say>
                  </Gather>
                  <Say>
                    Sorry, we did not receive a confirmation. Goodbye!
                  </Say>
                </Response>`,
        to: appointment.phone,
        from: process.env.TWILIO_PHONE,
      })
      .then((call: any) => {
        console.log(call);
      });
  });

  return NextResponse.json(`${appointments.length} reminder(s) sent!`);
}

export async function POST(req: NextRequest) {
  // If the user entered digits, process their request
  const { Digits } = await req.json();
  if (Digits) {
    const twiml = new VoiceResponse();
    switch (Digits) {
      case "1":
        twiml.say("Thank you for confirming. See you soon!");
        break;
      case "2":
        twiml.say("One of our representatives will be in touch to reschedule. Goodbye!");
        break;
      default:
        twiml.say("Sorry, I don't understand that choice. Goodbye!");
        break;
    }

    twiml.hangup();
    return NextResponse.json(twiml.toString());
  }
}
