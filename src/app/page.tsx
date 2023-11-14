import AppointmentsTable from '@/components/AppointmentsTable'
import prisma from '@/lib/prisma'
import moment from "moment";

async function getData() {
  const startDate = moment().format("YYYY-MM-DD");
  const appointments = await prisma.appointment.findMany({
    where: {
      bookedOn: {
        gte: new Date(startDate).toISOString()
      },
    },
  })
  return appointments
}

export default async function Home() {
  const data = await getData()
  return (
    <>
      <AppointmentsTable data={data}/>
    </>
    
  )
}
