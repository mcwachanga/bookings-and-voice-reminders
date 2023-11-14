'use server'

import prisma from "@/lib/prisma"
import {redirect} from 'next/navigation'
import validator from 'validator' 

export default async function handleAppointment(formData: FormData) {
    var doc = await prisma.appointment.create({
        data: {
            customer: formData.get('customer') as string,
            phone: formData.get('phone')  as string,
            reason: formData.get('reason')  as string,
            bookedOn: new Date(formData.get('bookedOn')  as string),
            reminded: false
        }
    })

    redirect("/");
}
