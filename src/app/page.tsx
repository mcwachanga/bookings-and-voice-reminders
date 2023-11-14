import AppointmentsTable from '@/components/AppointmentsTable'
import prisma from '@/lib/prisma'

async function getData() {
  const appointments = await prisma.appointment.findMany({
    // where: {
    //   author: { id: userId },
    // },
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
